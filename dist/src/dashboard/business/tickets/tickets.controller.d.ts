import { TicketsService } from './tickets.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    createTicketTier(userId: string, eventId: string, createTicketTierDto: CreateTicketTierDto): Promise<{
        bundledProducts: ({
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
            createdAt: Date;
            productId: string;
            ticketTierId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        eventId: string;
        price: import("@prisma/client/runtime/library").Decimal;
        quantity: number;
        saleStart: Date | null;
        saleEnd: Date | null;
        transferable: boolean;
        refundable: boolean;
        rules: string | null;
        accessZones: string[];
        stockTracking: boolean;
        autoLock: boolean;
        waitlist: boolean;
    }>;
    getTicketTiers(userId: string, eventId: string): Promise<({
        _count: {
            tickets: number;
        };
        bundledProducts: ({
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
            createdAt: Date;
            productId: string;
            ticketTierId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        eventId: string;
        price: import("@prisma/client/runtime/library").Decimal;
        quantity: number;
        saleStart: Date | null;
        saleEnd: Date | null;
        transferable: boolean;
        refundable: boolean;
        rules: string | null;
        accessZones: string[];
        stockTracking: boolean;
        autoLock: boolean;
        waitlist: boolean;
    })[]>;
    updateTicketTier(userId: string, eventId: string, tierId: string, updateTicketTierDto: UpdateTicketTierDto): Promise<{
        bundledProducts: ({
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
            createdAt: Date;
            productId: string;
            ticketTierId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        eventId: string;
        price: import("@prisma/client/runtime/library").Decimal;
        quantity: number;
        saleStart: Date | null;
        saleEnd: Date | null;
        transferable: boolean;
        refundable: boolean;
        rules: string | null;
        accessZones: string[];
        stockTracking: boolean;
        autoLock: boolean;
        waitlist: boolean;
    }>;
    deleteTicketTier(userId: string, eventId: string, tierId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        eventId: string;
        price: import("@prisma/client/runtime/library").Decimal;
        quantity: number;
        saleStart: Date | null;
        saleEnd: Date | null;
        transferable: boolean;
        refundable: boolean;
        rules: string | null;
        accessZones: string[];
        stockTracking: boolean;
        autoLock: boolean;
        waitlist: boolean;
    }>;
}
