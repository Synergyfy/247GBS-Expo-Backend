import { RewardsService } from './rewards.service';
export declare class RewardsIntegrationController {
    private readonly rewardsService;
    constructor(rewardsService: RewardsService);
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
}
