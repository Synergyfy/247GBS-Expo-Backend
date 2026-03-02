import { PrismaService } from '../../../prisma/prisma.service';
export declare class RedemptionService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(userId: string): Promise<{
        redeemed: number;
        total: number;
        queueTime: string;
        activeStaff: number;
    }>;
    getHistory(userId: string): Promise<({
        user: {
            email: string;
            name: string | null;
        };
        items: ({
            product: {
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.FulfilmentType;
        userId: string;
        boothId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        fulfilmentSlotId: string | null;
        fulfilmentPointId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        eventId: string;
        channel: import("@prisma/client").$Enums.SalesChannel;
        campaignId: string | null;
        salesAssetId: string | null;
    })[]>;
    findOrdersByVisitor(userId: string, identifier: string): Promise<({
        user: {
            email: string;
            name: string | null;
        };
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                category: import("@prisma/client").$Enums.ProductCategory;
                boothId: string;
                status: import("@prisma/client").$Enums.ProductStatus;
                price: import("@prisma/client/runtime/library").Decimal;
                image: string | null;
                sku: string | null;
                stock: number;
                substituteId: string | null;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.FulfilmentType;
        userId: string;
        boothId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        fulfilmentSlotId: string | null;
        fulfilmentPointId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        eventId: string;
        channel: import("@prisma/client").$Enums.SalesChannel;
        campaignId: string | null;
        salesAssetId: string | null;
    })[]>;
    redeemOrder(userId: string, orderId: string): Promise<{
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                category: import("@prisma/client").$Enums.ProductCategory;
                boothId: string;
                status: import("@prisma/client").$Enums.ProductStatus;
                price: import("@prisma/client/runtime/library").Decimal;
                image: string | null;
                sku: string | null;
                stock: number;
                substituteId: string | null;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.FulfilmentType;
        userId: string;
        boothId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        fulfilmentSlotId: string | null;
        fulfilmentPointId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        eventId: string;
        channel: import("@prisma/client").$Enums.SalesChannel;
        campaignId: string | null;
        salesAssetId: string | null;
    }>;
}
