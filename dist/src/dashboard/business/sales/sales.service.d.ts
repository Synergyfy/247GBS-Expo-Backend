import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateSalesAssetDto } from './dto/create-sales-asset.dto';
import { TrackVisitDto } from './dto/track-visit.dto';
export declare class SalesService {
    private prisma;
    constructor(prisma: PrismaService);
    getSalesStats(userId: string, eventId: string): Promise<{
        channelRevenue: number;
        directTraffic: string;
        conversionRate: string;
    }>;
    getChannelsData(userId: string, eventId: string): Promise<{
        id: string;
        name: string;
        status: string;
        sales: string;
        visitors: string;
    }[]>;
    getChannelPerformance(userId: string, eventId: string, channel: string): Promise<{
        timeSeries: any[];
        funnel: {
            visitors: number;
            successful: number;
        };
        devices: {
            mobile: string;
            desktop: string;
            tablet: string;
        };
    }>;
    trackVisit(dto: TrackVisitDto): Promise<{
        id: string;
        createdAt: Date;
        eventId: string;
        channel: import("@prisma/client").$Enums.SalesChannel;
        ip: string | null;
        userAgent: string | null;
        deviceType: string | null;
    } | {
        success: boolean;
        message: any;
    }>;
    createCampaign(userId: string, eventId: string, dto: CreateCampaignDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.CampaignType;
        description: string | null;
        location: string | null;
        eventId: string;
        startDate: Date;
        endDate: Date;
        code: string | null;
        discountType: import("@prisma/client").$Enums.DiscountType;
        discountValue: import("@prisma/client/runtime/library").Decimal;
        targetTierId: string | null;
    }>;
    getCampaigns(userId: string, eventId: string): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CampaignType;
        status: string;
        discount: string;
        sales: number;
        expiry: string | null;
        location: string | null;
    }[]>;
    private getExpiryString;
    getSalesAssets(userId: string, eventId: string, search?: string): Promise<{
        id: string;
        name: string | null;
        code: string;
        type: import("@prisma/client").$Enums.SalesAssetType;
        hits: number;
        conversions: number;
        revenue: string;
    }[]>;
    createSalesAsset(userId: string, eventId: string, dto: CreateSalesAssetDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.SalesAssetType;
        description: string | null;
        eventId: string;
        tierId: string | null;
        code: string;
        hits: number;
    }>;
    private verifyEventOwner;
    private getChannelName;
}
