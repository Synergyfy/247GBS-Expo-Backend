import { RewardsService } from './rewards.service';
export declare class RewardsMonitoringController {
    private readonly rewardsService;
    constructor(rewardsService: RewardsService);
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
    blockIP(userId: string, ipAddress: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        boothId: string;
        ip: string;
        reason: string | null;
    }>;
}
