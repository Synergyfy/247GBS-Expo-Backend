"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let SettingsService = class SettingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBoothForUser(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth)
            throw new common_1.NotFoundException('Business booth not found');
        return booth;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true }
        });
        const booth = await this.getBoothForUser(userId);
        return { user, booth };
    }
    async updateProfile(userId, data) {
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
    async getTeam(userId) {
        const booth = await this.getBoothForUser(userId);
        return this.prisma.eventStaff.findMany({
            where: { boothId: booth.id },
            include: { scanners: true },
        });
    }
    async addTeamMember(userId, data) {
        const booth = await this.getBoothForUser(userId);
        return this.prisma.eventStaff.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }
    async removeTeamMember(userId, staffId) {
        const booth = await this.getBoothForUser(userId);
        const staff = await this.prisma.eventStaff.findUnique({
            where: { id: staffId }
        });
        if (!staff || staff.boothId !== booth.id) {
            throw new common_1.NotFoundException('Team member not found or access denied');
        }
        return this.prisma.eventStaff.delete({
            where: { id: staffId }
        });
    }
    async getIntegrations(userId) {
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
    async getAuditLogs(userId) {
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
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map