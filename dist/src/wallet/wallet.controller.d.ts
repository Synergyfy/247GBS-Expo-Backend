import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
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
    getTransactions(userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        description: string | null;
        status: string;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    addFunds(userId: string, data: {
        amount: number;
        description?: string;
    }): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        points: import("@prisma/client/runtime/library").Decimal;
        cash: import("@prisma/client/runtime/library").Decimal;
        vouchers: import("@prisma/client/runtime/library").Decimal;
        credits: import("@prisma/client/runtime/library").Decimal;
    }>;
}
