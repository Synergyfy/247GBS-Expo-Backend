import { MarketplaceService } from './marketplace.service';
import { GetMarketplaceEventsDto } from './dto/get-marketplace-events.dto';
import { CheckoutDto } from './dto/checkout.dto';
export declare class MarketplaceController {
    private readonly marketplaceService;
    constructor(marketplaceService: MarketplaceService);
    findAll(query: GetMarketplaceEventsDto): Promise<({
        _count: {
            tickets: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string | null;
        format: string | null;
        location: string | null;
        category: string;
        ownerId: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        startDate: Date;
        endDate: Date;
        organizer: string;
        fullImage: string | null;
        videoUrl: string | null;
        benefits: string[];
        rating: import("@prisma/client/runtime/library").Decimal | null;
        reviews: number | null;
        capacity: number;
        boothLayout: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    getCategories(): Promise<string[]>;
    checkout(userId: string, data: CheckoutDto): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        eventId: string;
        channel: import("@prisma/client").$Enums.SalesChannel;
        campaignId: string | null;
        salesAssetId: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        scanned: boolean;
        scannedAt: Date | null;
        tierId: string | null;
    }>;
    findOne(id: string): Promise<{
        _count: {
            tickets: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string | null;
        format: string | null;
        location: string | null;
        category: string;
        ownerId: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        startDate: Date;
        endDate: Date;
        organizer: string;
        fullImage: string | null;
        videoUrl: string | null;
        benefits: string[];
        rating: import("@prisma/client/runtime/library").Decimal | null;
        reviews: number | null;
        capacity: number;
        boothLayout: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
