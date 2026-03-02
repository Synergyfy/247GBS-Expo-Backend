import { PrismaService } from '../prisma/prisma.service';
export declare class BookingService {
    private prisma;
    constructor(prisma: PrismaService);
    createBooking(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
        status: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
    getMyBookings(userId: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
        status: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    })[]>;
    getBoothBookings(boothId: string): Promise<({
        user: {
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
        status: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    })[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
        status: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            qrCode: string | null;
            createdAt: Date;
            updatedAt: Date;
            referrerId: string | null;
        };
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
        status: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
}
