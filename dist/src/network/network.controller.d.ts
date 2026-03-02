import { NetworkService } from './network.service';
export declare class NetworkController {
    private readonly networkService;
    constructor(networkService: NetworkService);
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
    joinNetwork(userId: string, data: {
        referrerId: string;
    }): Promise<{
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
