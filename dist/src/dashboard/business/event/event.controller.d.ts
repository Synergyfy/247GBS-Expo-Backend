import { DashboardEventService } from './event.service';
import { CreateEventDto } from '../../../event/dto/create-event.dto';
import { UpdateEventDto } from '../../../event/dto/update-event.dto';
import { GetEventsQueryDto } from '../../../event/dto/get-events-query.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { LinkProductsDto } from './dto/link-products.dto';
import { SaveBoothLayoutDto } from './dto/save-booth-layout.dto';
export declare class DashboardEventController {
    private readonly eventService;
    constructor(eventService: DashboardEventService);
    create(userId: string, createEventDto: CreateEventDto): Promise<{
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
    findAll(userId: string, query: GetEventsQueryDto): Promise<{
        events: {
            id: string;
            title: string;
            status: string;
            pipelineStep: number;
            date: string;
            location: string;
            ticketsSold: number;
            capacity: number;
            revenue: string;
            type: string;
        }[];
        stats: {
            totalTicketsSold: number;
            totalUniqueAttendees: number;
            totalRevenue: string;
        };
    }>;
    checkIn(userId: string, ticketId: string): Promise<{
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
    findOne(userId: string, id: string): Promise<{
        tickets: ({
            user: {
                email: string;
                name: string | null;
            };
        } & {
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
        })[];
        ticketTiers: {
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
        }[];
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
    update(userId: string, id: string, updateEventDto: UpdateEventDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
    getSessions(userId: string, eventId: string): Promise<({
        speaker: {
            id: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            eventId: string;
            topic: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        eventId: string;
        time: string;
        hall: string;
        speakerId: string | null;
    })[]>;
    createSession(userId: string, eventId: string, createSessionDto: CreateSessionDto): Promise<{
        speaker: {
            id: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            eventId: string;
            topic: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        eventId: string;
        time: string;
        hall: string;
        speakerId: string | null;
    }>;
    updateSession(userId: string, eventId: string, sessionId: string, updateSessionDto: UpdateSessionDto): Promise<{
        speaker: {
            id: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            eventId: string;
            topic: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        eventId: string;
        time: string;
        hall: string;
        speakerId: string | null;
    }>;
    deleteSession(userId: string, eventId: string, sessionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        eventId: string;
        time: string;
        hall: string;
        speakerId: string | null;
    }>;
    getSpeakers(userId: string, eventId: string): Promise<({
        sessions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            eventId: string;
            time: string;
            hall: string;
            speakerId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        topic: string | null;
    })[]>;
    createSpeaker(userId: string, eventId: string, createSpeakerDto: CreateSpeakerDto): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        topic: string | null;
    }>;
    updateSpeaker(userId: string, eventId: string, speakerId: string, updateSpeakerDto: UpdateSpeakerDto): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        topic: string | null;
    }>;
    deleteSpeaker(userId: string, eventId: string, speakerId: string): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        topic: string | null;
    }>;
    getBoothLayout(userId: string, eventId: string): Promise<{
        layout: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray | null;
    }>;
    saveBoothLayout(userId: string, eventId: string, saveBoothLayoutDto: SaveBoothLayoutDto): Promise<{
        id: string;
        boothLayout: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getEventProducts(userId: string, eventId: string): Promise<({
        booth: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            logo: string | null;
            banner: string | null;
            phoneNumber: string | null;
            website: string | null;
            location: string | null;
            category: string | null;
            contactName: string | null;
            contactTitle: string | null;
            publicEmail: string | null;
            phoneDisplay: string | null;
            tagline: string | null;
            ownerId: string;
            settlementRule: string;
            autoPayout: boolean;
        };
    } & {
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
    })[]>;
    getMyInventory(userId: string): Promise<{
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
    }[]>;
    linkProducts(userId: string, eventId: string, linkProductsDto: LinkProductsDto): Promise<{
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
    }[]>;
    unlinkProduct(userId: string, eventId: string, productId: string): Promise<{
        id: string;
        createdAt: Date;
        eventId: string;
        productId: string;
    }>;
}
