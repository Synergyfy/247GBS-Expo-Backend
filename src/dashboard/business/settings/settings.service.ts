import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found');
        return booth;
    }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true }
        });
        const booth = await this.getBoothForUser(userId);
        return { user, booth };
    }

    async updateProfile(userId: string, data: any) {
        return await this.prisma.$transaction(async (tx) => {
            if (data.user) {
                await tx.user.update({
                    where: { id: userId },
                    data: data.user,
                });
            }
            if (data.booth) {
                const booth = await this.getBoothForUser(userId);
                await tx.booth.update({
                    where: { id: booth.id },
                    data: data.booth,
                });
            }
            return this.getProfile(userId);
        });
    }

    async getTeam(userId: string) {
        const booth = await this.getBoothForUser(userId);
        return this.prisma.eventStaff.findMany({
            where: { boothId: booth.id },
            include: { scanners: true },
        });
    }

    async addTeamMember(userId: string, data: any) {
        const booth = await this.getBoothForUser(userId);
        return this.prisma.eventStaff.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }

    async removeTeamMember(userId: string, staffId: string) {
        const booth = await this.getBoothForUser(userId);
        const staff = await this.prisma.eventStaff.findUnique({
            where: { id: staffId }
        });

        if (!staff || staff.boothId !== booth.id) {
            throw new NotFoundException('Team member not found or access denied');
        }

        return this.prisma.eventStaff.delete({
            where: { id: staffId }
        });
    }

    async getIntegrations(userId: string) {
        const booth = await this.getBoothForUser(userId);

        const [loyaltyIntegrations, scanners, fulfilmentPoints] = await Promise.all([
            this.prisma.loyaltyIntegration.findMany({
                where: { boothId: booth.id }
            }),
            this.prisma.scanner.count({
                where: { boothId: booth.id }
            }),
            this.prisma.fulfilmentPoint.count({
                where: { boothId: booth.id }
            })
        ]);

        return [
            {
                category: 'Logistics & Shipping',
                integrations: [
                    { name: 'Standard Shipping', status: fulfilmentPoints > 0 ? 'Active' : 'Setup Required', type: 'INTERNAL' },
                    { name: 'External Courier Sync', status: 'Coming Soon', type: 'EXTERNAL' }
                ]
            },
            {
                category: 'Payment Gateways',
                integrations: [
                    { name: 'Internal Wallet', status: 'Active', type: 'NATIVE' },
                    { name: 'Stripe Connect', status: booth.settlementRule ? 'Active' : 'Disconnected', type: 'EXTERNAL' }
                ]
            },
            {
                category: 'Marketing & CRM',
                integrations: loyaltyIntegrations.map(i => ({
                    name: i.name,
                    status: i.status,
                    type: i.type
                }))
            },
            {
                category: 'POS Systems',
                integrations: [
                    { name: 'Native Scanner App', status: scanners > 0 ? 'Connected' : 'No Devices', type: 'NATIVE' }
                ]
            },
            {
                category: 'ERP & Accounting',
                integrations: [
                    { name: 'QuickBooks Sync', status: 'Coming Soon', type: 'EXTERNAL' },
                    { name: 'Odoo ERP', status: 'Coming Soon', type: 'EXTERNAL' }
                ]
            }
        ];
    }

    async getAuditLogs(userId: string) {
        const booth = await this.getBoothForUser(userId);

        const [rewardLogs, logisticsLogs, syncLogs] = await Promise.all([
            this.prisma.rewardAllocation.findMany({
                where: { boothId: booth.id },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
            this.prisma.logisticsException.findMany({
                where: { boothId: booth.id },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            this.prisma.loyaltySyncLog.findMany({
                where: { integration: { boothId: booth.id } },
                orderBy: { createdAt: 'desc' },
                take: 5,
            })
        ]);

        const combinedLogs = [
            ...rewardLogs.map(log => ({
                id: log.id,
                type: 'REWARD',
                title: 'Reward Allocated',
                detail: `Reward issued to ${log.email}`,
                timestamp: log.createdAt,
                status: log.status
            })),
            ...logisticsLogs.map(log => ({
                id: log.id,
                type: 'LOGISTICS',
                title: 'Logistics Exception',
                detail: log.message,
                timestamp: log.createdAt,
                status: log.resolved ? 'RESOLVED' : 'ACTIVE'
            })),
            ...syncLogs.map(log => ({
                id: log.id,
                type: 'SYNC',
                title: 'Integration Sync',
                detail: `Synced ${log.syncedProfiles} profiles`,
                timestamp: log.createdAt,
                status: log.apiStatus
            }))
        ];

        return combinedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
}
