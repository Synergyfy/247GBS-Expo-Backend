import { GetMarketplaceEventsDto } from './dto/get-marketplace-events.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class MarketplaceService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllEvents(query: GetMarketplaceEventsDto): Promise<({
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
        price: Prisma.Decimal;
        startDate: Date;
        endDate: Date;
        organizer: string;
        fullImage: string | null;
        videoUrl: string | null;
        benefits: string[];
        rating: Prisma.Decimal | null;
        reviews: number | null;
        capacity: number;
        boothLayout: Prisma.JsonValue | null;
    })[]>;
    getEventById(id: string): Promise<{
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
        price: Prisma.Decimal;
        startDate: Date;
        endDate: Date;
        organizer: string;
        fullImage: string | null;
        videoUrl: string | null;
        benefits: string[];
        rating: Prisma.Decimal | null;
        reviews: number | null;
        capacity: number;
        boothLayout: Prisma.JsonValue | null;
    }>;
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
        price: Prisma.Decimal;
        scanned: boolean;
        scannedAt: Date | null;
        tierId: string | null;
    }>;
}
