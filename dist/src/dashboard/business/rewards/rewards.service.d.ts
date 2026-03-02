import { PrismaService } from '../../../prisma/prisma.service';
import { PurchaseBundleDto } from './dto/purchase-bundle.dto';
import { AllocateTicketsDto } from './dto/allocate-tickets.dto';
export declare class RewardsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    getRewardStats(userId: string, eventId: string): Promise<{
        activeRewards: number;
        redeemed: number;
        bulkTickets: number;
        reach: number;
    }>;
    purchaseBundle(userId: string, eventId: string, dto: PurchaseBundleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        eventId: string;
        balance: number;
        totalPurchased: number;
        totalAllocated: number;
    }>;
    allocateTickets(userId: string, eventId: string, dto: AllocateTicketsDto): Promise<{
        success: boolean;
        allocatedCount: number;
        remainingBalance: number;
    }>;
    getRewardCampaigns(userId: string, eventId: string): Promise<{
        name: string;
        type: string;
        status: string;
        progress: number;
        expiry: string | null;
    }[]>;
    getIntegrationStatus(userId: string, eventId: string): Promise<{
        syncActive: boolean;
        lastSyncTime: Date;
        syncedProfiles: number;
        apiStatus: string;
    }>;
    listIntegrations(userId: string, eventId: string): Promise<({
        status: string;
        id: string;
        name: string;
        desc: string;
        type: string;
        icon: string;
        color: string;
        bg: string;
        isComingSoon?: undefined;
    } | {
        status: string;
        id: string;
        name: string;
        desc: string;
        type: string;
        isComingSoon: boolean;
        icon: string;
        color: string;
        bg: string;
    })[]>;
    getMonitoringStats(userId: string, eventId: string): Promise<{
        issued: number;
        redeemed: number;
        expired: number;
        flagged: number;
    }>;
    getRewardLogs(userId: string, eventId: string, search?: string): Promise<{
        id: any;
        user: any;
        reward: any;
        status: string;
        time: string;
        ip: any;
    }[]>;
    getAbuseAlerts(userId: string, eventId: string): Promise<{
        type: string;
        message: string;
        ip: string | null;
        count: number;
    }[]>;
    blockIP(userId: string, ip: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        boothId: string;
        ip: string;
        reason: string | null;
    }>;
    private formatStatus;
    private getTimeAgo;
    private getExpiryString;
}
