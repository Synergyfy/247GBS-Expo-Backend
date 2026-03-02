import { RewardsService } from './rewards.service';
import { PurchaseBundleDto } from './dto/purchase-bundle.dto';
import { AllocateTicketsDto } from './dto/allocate-tickets.dto';
export declare class RewardsController {
    private readonly rewardsService;
    constructor(rewardsService: RewardsService);
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
}
