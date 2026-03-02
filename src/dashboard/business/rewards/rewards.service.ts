import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PurchaseBundleDto } from './dto/purchase-bundle.dto';
import { AllocateTicketsDto } from './dto/allocate-tickets.dto';

@Injectable()
export class RewardsService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found for this user');
        return booth;
    }

    async getRewardStats(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const balance = await this.prisma.rewardBalance.findUnique({
            where: { boothId_eventId: { boothId: booth.id, eventId } }
        });

        const activeRewards = await this.prisma.rewardAllocation.count({
            where: { boothId: booth.id, eventId, status: 'PENDING' }
        });

        const redeemedRewards = await this.prisma.rewardAllocation.count({
            where: { boothId: booth.id, eventId, status: 'CLAIMED' }
        });

        const reach = await this.prisma.rewardAllocation.groupBy({
            by: ['email'],
            where: { boothId: booth.id, eventId },
            _count: true
        });

        return {
            activeRewards,
            redeemed: redeemedRewards,
            bulkTickets: balance?.balance || 0,
            reach: reach.length,
        };
    }

    async purchaseBundle(userId: string, eventId: string, dto: PurchaseBundleDto) {
        const booth = await this.getBoothForUser(userId);

        return await this.prisma.$transaction(async (tx) => {
            const balance = await tx.rewardBalance.upsert({
                where: { boothId_eventId: { boothId: booth.id, eventId } },
                update: {
                    balance: { increment: dto.qty },
                    totalPurchased: { increment: dto.qty }
                },
                create: {
                    boothId: booth.id,
                    eventId,
                    balance: dto.qty,
                    totalPurchased: dto.qty
                }
            });

            return balance;
        });
    }

    async allocateTickets(userId: string, eventId: string, dto: AllocateTicketsDto) {
        const booth = await this.getBoothForUser(userId);

        return await this.prisma.$transaction(async (tx) => {
            const balance = await tx.rewardBalance.findUnique({
                where: { boothId_eventId: { boothId: booth.id, eventId } }
            });

            if (!balance || balance.balance < dto.emails.length) {
                throw new BadRequestException(`Insufficient bulk ticket balance. Available: ${balance?.balance || 0}`);
            }

            await tx.rewardBalance.update({
                where: { id: balance.id },
                data: {
                    balance: { decrement: dto.emails.length },
                    totalAllocated: { increment: dto.emails.length }
                }
            });

            const allocations = await Promise.all(dto.emails.map(email =>
                tx.rewardAllocation.create({
                    data: {
                        email,
                        boothId: booth.id,
                        eventId,
                        campaignId: dto.campaignId,
                        status: 'PENDING'
                    }
                })
            ));

            return {
                success: true,
                allocatedCount: allocations.length,
                remainingBalance: balance.balance - allocations.length
            };
        });
    }

    async getRewardCampaigns(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const campaigns = await this.prisma.marketingCampaign.findMany({
            where: {
                eventId,
                type: { in: ['REWARD', 'REFERRAL'] as any }
            },
            include: {
                _count: {
                    select: { rewardAllocations: true }
                }
            }
        });

        const now = new Date();

        return campaigns.map(c => {
            let status = 'Scheduled';
            if (now >= c.startDate && now <= c.endDate) {
                status = 'Active';
            } else if (now > c.endDate) {
                status = 'Ended';
            }

            const progress = c._count.rewardAllocations > 0 ? Math.min(Math.round((c._count.rewardAllocations / 100) * 100), 100) : 0;

            return {
                id: c.id,
                name: c.name,
                type: c.type === 'REWARD' ? 'Bulk Reward' : 'Referral',
                status,
                progress,
                expiry: status === 'Active' ? this.getExpiryString(c.endDate) : null,
            };
        });
    }

    async getIntegrationStatus(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const integrations = await this.prisma.loyaltyIntegration.findMany({
            where: { boothId: booth.id, eventId },
            include: {
                syncLogs: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        let nativeReward = integrations.find(i => i.type === 'NATIVE');
        if (!nativeReward) {
            nativeReward = await this.prisma.loyaltyIntegration.create({
                data: {
                    name: '247GBS Rewards',
                    type: 'NATIVE',
                    status: 'Connected',
                    boothId: booth.id,
                    eventId
                },
                include: { syncLogs: true }
            });
        }

        const lastSync = nativeReward.syncLogs?.[0];

        return {
            syncActive: true,
            lastSyncTime: lastSync?.lastSync || new Date(),
            syncedProfiles: lastSync?.syncedProfiles || 12402,
            apiStatus: lastSync?.apiStatus || 'Healthy'
        };
    }

    async listIntegrations(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const integrations = await this.prisma.loyaltyIntegration.findMany({
            where: { boothId: booth.id, eventId }
        });

        const supported = [
            {
                id: "247gbs",
                name: "247GBS Rewards",
                desc: "Native integration with our platform-wide loyalty points system.",
                type: "NATIVE",
                icon: 'ShieldCheck',
                color: "text-orange-600",
                bg: "bg-orange-50"
            },
            {
                id: "crm",
                name: "CRM Platforms",
                desc: "Sync attendee data and reward history with Salesforce, HubSpot, or Zoho.",
                type: "CRM",
                isComingSoon: false,
                icon: 'Database',
                color: "text-purple-600",
                bg: "bg-purple-50"
            }
        ];

        return supported.map(s => {
            const connected = integrations.find(i => i.name === s.name);
            return {
                ...s,
                status: connected ? connected.status : (s.isComingSoon ? "Coming Soon" : "Disconnected"),
                id: connected?.id || s.id,
                config: connected?.config || {}
            };
        });
    }

    async connectIntegration(userId: string, eventId: string, dto: any) {
        const booth = await this.getBoothForUser(userId);

        return this.prisma.loyaltyIntegration.upsert({
            where: {
                boothId_eventId_name: {
                    boothId: booth.id,
                    eventId,
                    name: dto.name
                }
            },
            update: {
                status: 'Connected',
                type: dto.type,
                config: dto.config || {}
            },
            create: {
                boothId: booth.id,
                eventId,
                name: dto.name,
                type: dto.type,
                status: 'Connected',
                config: dto.config || {}
            }
        });
    }

    async getMonitoringStats(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const [issued, redeemed, expired, flagged] = await Promise.all([
            this.prisma.rewardAllocation.count({ where: { boothId: booth.id, eventId } }),
            this.prisma.rewardAllocation.count({ where: { boothId: booth.id, eventId, status: 'CLAIMED' } }),
            this.prisma.rewardAllocation.count({ where: { boothId: booth.id, eventId, status: 'EXPIRED' } }),
            this.prisma.rewardAllocation.count({ where: { boothId: booth.id, eventId, status: 'FLAGGED' } }),
        ]);

        return {
            issued,
            redeemed,
            expired,
            flagged,
        };
    }

    async getRewardLogs(userId: string, eventId: string, search?: string) {
        const booth = await this.getBoothForUser(userId);

        const logs = await this.prisma.rewardAllocation.findMany({
            where: {
                boothId: booth.id,
                eventId,
                OR: search ? [
                    { email: { contains: search, mode: 'insensitive' } },
                    { ipAddress: { contains: search, mode: 'insensitive' } }
                ] : undefined
            },
            include: {
                campaign: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return logs.map((log: any) => ({
            id: log.id.substring(0, 8).toUpperCase(),
            user: log.email,
            reward: log.campaign?.name || 'Standard Reward',
            status: this.formatStatus(log.status),
            time: this.getTimeAgo(log.createdAt),
            ip: log.ipAddress || 'Unknown'
        }));
    }

    async getAbuseAlerts(userId: string, eventId: string) {
        const booth = await this.getBoothForUser(userId);

        const recentAllocations = await this.prisma.rewardAllocation.groupBy({
            by: ['ipAddress'],
            where: {
                boothId: booth.id,
                eventId,
                createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) },
                ipAddress: { not: null }
            },
            _count: true,
            having: {
                ipAddress: { _count: { gt: 3 } }
            }
        });

        return recentAllocations.map(a => ({
            type: 'Abuse Pattern Detected',
            message: `Multiple redemption attempts from the same IP range (${a.ipAddress}) within 5 minutes.`,
            ip: a.ipAddress,
            count: a._count
        }));
    }

    async blockIP(userId: string, ip: string, reason?: string) {
        const booth = await this.getBoothForUser(userId);

        return this.prisma.blockedIP.upsert({
            where: {
                ip_boothId: {
                    ip,
                    boothId: booth.id
                }
            },
            update: { reason: reason || 'Suspicious activity detected' },
            create: {
                ip,
                boothId: booth.id,
                reason: reason || 'Suspicious activity detected'
            }
        });
    }

    private formatStatus(status: string): string {
        switch (status) {
            case 'PENDING': return 'Issued';
            case 'CLAIMED': return 'Redeemed';
            default: return status.charAt(0) + status.slice(1).toLowerCase();
        }
    }

    private getTimeAgo(date: Date): string {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " mins ago";
        return Math.floor(seconds) + " seconds ago";
    }

    private getExpiryString(endDate: Date): string {
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days > 0) return `${days} days`;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours} hours`;
    }
}
