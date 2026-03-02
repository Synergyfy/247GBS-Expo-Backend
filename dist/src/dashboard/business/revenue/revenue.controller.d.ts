import { RevenueService } from './revenue.service';
export declare class RevenueController {
    private readonly revenueService;
    constructor(revenueService: RevenueService);
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
    getLedger(userId: string): Promise<{
        name: string;
        type: string;
        status: string;
        amount: string;
        date: string;
    }[]>;
    updateSettings(userId: string, body: {
        settlementRule?: string;
        autoPayout?: boolean;
    }): Promise<{
        message: string;
        settlementRule: string;
        autoPayout: boolean;
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
    getFinanceTicketById(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string;
        boothId: string;
        status: string;
        subject: string;
    }>;
    createFinanceTicket(userId: string, body: {
        subject: string;
        description: string;
        type?: string;
    }): Promise<{
        message: string;
        ticketId: string;
    }>;
}
