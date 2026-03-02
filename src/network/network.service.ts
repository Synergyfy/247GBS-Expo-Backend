import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NetworkService {
    constructor(private prisma: PrismaService) { }

    async getReferralTree(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                referrals: {
                    include: {
                        referrals: true, // Level 2
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user.referrals;
    }

    async getNetworkStats(userId: string) {
        const directReferrals = await this.prisma.user.count({
            where: { referrerId: userId },
        });

        // Indirect referrals (Level 2)
        const directIds = (await this.prisma.user.findMany({
            where: { referrerId: userId },
            select: { id: true },
        })).map(u => u.id);

        const indirectReferrals = await this.prisma.user.count({
            where: { referrerId: { in: directIds } },
        });

        return {
            directReferrals,
            indirectReferrals,
            totalReferrals: directReferrals + indirectReferrals,
        };
    }

    async setReferrer(userId: string, referrerId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        if (user.referrerId) {
            throw new Error('Referrer already set');
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: { referrerId },
        });
    }
}
