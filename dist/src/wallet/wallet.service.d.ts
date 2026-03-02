import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getWallet(userId: string): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            type: string;
            description: string | null;
            status: string;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        points: import("@prisma/client/runtime/library").Decimal;
        cash: import("@prisma/client/runtime/library").Decimal;
        vouchers: import("@prisma/client/runtime/library").Decimal;
        credits: import("@prisma/client/runtime/library").Decimal;
    }>;
    getTransactionHistory(userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    updateBalance(userId: string, amount: number, type: string, description?: string): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        points: import("@prisma/client/runtime/library").Decimal;
        cash: import("@prisma/client/runtime/library").Decimal;
        vouchers: import("@prisma/client/runtime/library").Decimal;
        credits: import("@prisma/client/runtime/library").Decimal;
    }>;
}
