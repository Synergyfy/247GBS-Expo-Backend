import { PrismaService } from '../../../prisma/prisma.service';
export declare class RevenueService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    getWallet(userId: string): Promise<{
        balance: string;
        monthlyGrowth: string;
        available: string;
        pending: string;
        disputeHolds: string;
        refundReserve: string;
    }>;
    getPayoutSchedule(userId: string): Promise<{
        nextSettlement: string;
        estimatedAmount: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    getLedgerTransactions(userId: string): Promise<{
        name: string;
        type: string;
        status: string;
        amount: string;
        date: string;
    }[]>;
    updateSettings(userId: string, data: {
        settlementRule?: string;
        autoPayout?: boolean;
    }): Promise<{
        message: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    openFinanceTicket(userId: string, data: {
        subject: string;
        description: string;
        type?: string;
    }): Promise<{
        message: string;
        ticketId: string;
    }>;
    getFinanceTickets(userId: string): Promise<{
        id: string;
        subject: string;
        type: string;
        status: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getFinanceTicketById(userId: string, ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string;
        boothId: string;
        status: string;
        subject: string;
    }>;
}
