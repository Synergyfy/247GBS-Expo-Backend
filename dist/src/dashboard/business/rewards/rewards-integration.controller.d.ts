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
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
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
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
        name: string;
        desc: string;
        type: string;
        isComingSoon: boolean;
        icon: string;
        color: string;
        bg: string;
    })[]>;
    connectIntegration(userId: string, eventId: string, dto: any): Promise<{
        boothId: string;
        eventId: string;
        status: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
