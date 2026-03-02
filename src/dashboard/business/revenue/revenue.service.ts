import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RevenueService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found for this user');
        return booth;
    }

    async getWallet(userId: string) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
                include: { transactions: true }
            });

            if (!wallet) {
                return {
                    balance: "0.00",
                    monthlyGrowth: "+£0.00 this month",
                    available: "0.00",
                    pending: "0.00",
                    disputeHolds: "0.00",
                    refundReserve: "0.00"
                };
            }

            const txs = wallet.transactions;
            const totalCash = wallet.cash ? Number(wallet.cash) : 0;

            const pendingAmount = txs
                .filter(t => t.status === 'PENDING' && Number(t.amount) > 0)
                .reduce((sum, t) => sum + Number(t.amount), 0);

            const disputedAmount = txs
                .filter(t => t.status === 'DISPUTED')
                .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

            // Calculate earnings for the current month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const monthlyEarnings = txs
                .filter(t => t.type === 'EARNING' && t.createdAt >= startOfMonth)
                .reduce((sum, t) => sum + Number(t.amount), 0);

            // Reserve could be dynamic or fixed based on settings. Assuming a fixed 2000 minimum reserve for simplicity.
            const refundReserve = 2000;

            let available = totalCash - pendingAmount - disputedAmount - refundReserve;
            if (available < 0) available = 0;

            return {
                balance: totalCash.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                monthlyGrowth: `+£${monthlyEarnings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month`,
                available: available.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                pending: pendingAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                disputeHolds: disputedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                refundReserve: refundReserve.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            };
        } catch (error) {
            throw new BadRequestException('Failed to fetch wallet info: ' + error.message);
        }
    }

    async getPayoutSchedule(userId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            // Calculate next settlement date dynamically based on rule (T+1, T+3, T+7)
            const ruleDays = parseInt(booth.settlementRule.replace('T+', '')) || 3;
            const nextSettlementDate = new Date();

            let addedDays = 0;
            while (addedDays < ruleDays) {
                nextSettlementDate.setDate(nextSettlementDate.getDate() + 1);
                // Skip weekends
                if (nextSettlementDate.getDay() !== 0 && nextSettlementDate.getDay() !== 6) {
                    addedDays++;
                }
            }

            // To get estimated amount, reuse getWallet
            const walletInfo = await this.getWallet(userId);
            // Revert localized string to plain number format for the UI payload 
            const estimatedAmount = walletInfo.available.replace(/,/g, '');

            return {
                nextSettlement: nextSettlementDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                estimatedAmount,
                settlementRule: booth.settlementRule,
                autoPayout: booth.autoPayout !== false
            };
        } catch (error) {
            throw new BadRequestException('Failed to fetch payout schedule: ' + error.message);
        }
    }

    async getLedgerTransactions(userId: string) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId }
            });

            if (!wallet) return [];

            const transactions = await this.prisma.transaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
                take: 20
            });

            return transactions.map(tx => ({
                name: tx.description || "Transfer",
                type: tx.type, // Sale, Withdrawal, Refund
                // UI expects things like Completed, Disputed, Processing
                status: tx.status === 'PENDING' ? 'Processing' :
                    tx.status === 'COMPLETED' ? 'Completed' :
                        tx.status === 'DISPUTED' ? 'Disputed' : 'Failed',
                amount: Number(tx.amount) > 0 ? `+£${Number(tx.amount).toFixed(2)}` : `-£${Math.abs(Number(tx.amount)).toFixed(2)}`,
                date: tx.createdAt.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            }));

        } catch (error) {
            throw new BadRequestException('Failed to fetch ledger: ' + error.message);
        }
    }

    async updateSettings(userId: string, data: { settlementRule?: string; autoPayout?: boolean }) {
        try {
            const booth = await this.getBoothForUser(userId);
            const updated = await this.prisma.booth.update({
                where: { id: booth.id },
                data: {
                    settlementRule: data.settlementRule !== undefined ? data.settlementRule : undefined,
                    autoPayout: data.autoPayout !== undefined ? data.autoPayout : undefined
                }
            });

            return {
                message: "Payout settings updated successfully",
                settlementRule: updated.settlementRule,
                autoPayout: updated.autoPayout
            };
        } catch (error) {
            throw new BadRequestException('Failed to update payout settings: ' + error.message);
        }
    }

    async openFinanceTicket(userId: string, data: { subject: string, description: string, type?: string }) {
        try {
            const booth = await this.getBoothForUser(userId);

            const ticket = await this.prisma.financeTicket.create({
                data: {
                    boothId: booth.id,
                    subject: data.subject,
                    description: data.description,
                    type: data.type || "GENERAL",
                    status: "OPEN"
                }
            });

            return {
                message: "Finance ticket opened successfully",
                ticketId: ticket.id
            };
        } catch (error) {
            throw new BadRequestException('Failed to open finance ticket: ' + error.message);
        }
    }

    async getFinanceTickets(userId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const tickets = await this.prisma.financeTicket.findMany({
                where: { boothId: booth.id },
                orderBy: { createdAt: 'desc' }
            });

            return tickets.map(t => ({
                id: t.id,
                subject: t.subject,
                type: t.type,
                status: t.status,
                description: t.description,
                createdAt: t.createdAt,
                updatedAt: t.updatedAt
            }));
        } catch (error) {
            throw new BadRequestException('Failed to fetch finance tickets: ' + error.message);
        }
    }

    async getFinanceTicketById(userId: string, ticketId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const ticket = await this.prisma.financeTicket.findUnique({
                where: { id: ticketId }
            });

            if (!ticket) throw new NotFoundException('Ticket not found');
            if (ticket.boothId !== booth.id) throw new ForbiddenException('Access denied');

            return ticket;
        } catch (error) {
            throw new BadRequestException('Failed to fetch ticket: ' + error.message);
        }
    }
}

