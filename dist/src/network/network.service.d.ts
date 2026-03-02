import { PrismaService } from '../prisma/prisma.service';
export declare class NetworkService {
    private prisma;
    constructor(prisma: PrismaService);
    getReferralTree(userId: string): Promise<({
        referrals: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            qrCode: string | null;
            createdAt: Date;
            updatedAt: Date;
            referrerId: string | null;
        }[];
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        qrCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        referrerId: string | null;
    })[]>;
    getNetworkStats(userId: string): Promise<{
        directReferrals: number;
        indirectReferrals: number;
        totalReferrals: number;
    }>;
    setReferrer(userId: string, referrerId: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        qrCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        referrerId: string | null;
    }>;
}
