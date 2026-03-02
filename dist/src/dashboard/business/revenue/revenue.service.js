"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RevenueService = class RevenueService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBoothForUser(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth)
            throw new common_1.NotFoundException('Business booth not found for this user');
        return booth;
    }
    async getWallet(userId) {
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
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            const monthlyEarnings = txs
                .filter(t => t.type === 'EARNING' && t.createdAt >= startOfMonth)
                .reduce((sum, t) => sum + Number(t.amount), 0);
            const refundReserve = 2000;
            let available = totalCash - pendingAmount - disputedAmount - refundReserve;
            if (available < 0)
                available = 0;
            return {
                balance: totalCash.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                monthlyGrowth: `+£${monthlyEarnings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month`,
                available: available.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                pending: pendingAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                disputeHolds: disputedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                refundReserve: refundReserve.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch wallet info: ' + error.message);
        }
    }
    async getPayoutSchedule(userId) {
        try {
            const booth = await this.getBoothForUser(userId);
            const ruleDays = parseInt(booth.settlementRule.replace('T+', '')) || 3;
            const nextSettlementDate = new Date();
            let addedDays = 0;
            while (addedDays < ruleDays) {
                nextSettlementDate.setDate(nextSettlementDate.getDate() + 1);
                if (nextSettlementDate.getDay() !== 0 && nextSettlementDate.getDay() !== 6) {
                    addedDays++;
                }
            }
            const walletInfo = await this.getWallet(userId);
            const estimatedAmount = walletInfo.available.replace(/,/g, '');
            return {
                nextSettlement: nextSettlementDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                estimatedAmount,
                settlementRule: booth.settlementRule,
                autoPayout: booth.autoPayout !== false
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch payout schedule: ' + error.message);
        }
    }
    async getLedgerTransactions(userId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId }
            });
            if (!wallet)
                return [];
            const transactions = await this.prisma.transaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
                take: 20
            });
            return transactions.map(tx => ({
                name: tx.description || "Transfer",
                type: tx.type,
                status: tx.status === 'PENDING' ? 'Processing' :
                    tx.status === 'COMPLETED' ? 'Completed' :
                        tx.status === 'DISPUTED' ? 'Disputed' : 'Failed',
                amount: Number(tx.amount) > 0 ? `+£${Number(tx.amount).toFixed(2)}` : `-£${Math.abs(Number(tx.amount)).toFixed(2)}`,
                date: tx.createdAt.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch ledger: ' + error.message);
        }
    }
    async updateSettings(userId, data) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update payout settings: ' + error.message);
        }
    }
    async openFinanceTicket(userId, data) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to open finance ticket: ' + error.message);
        }
    }
    async getFinanceTickets(userId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch finance tickets: ' + error.message);
        }
    }
    async getFinanceTicketById(userId, ticketId) {
        try {
            const booth = await this.getBoothForUser(userId);
            const ticket = await this.prisma.financeTicket.findUnique({
                where: { id: ticketId }
            });
            if (!ticket)
                throw new common_1.NotFoundException('Ticket not found');
            if (ticket.boothId !== booth.id)
                throw new common_1.ForbiddenException('Access denied');
            return ticket;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch ticket: ' + error.message);
        }
    }
};
exports.RevenueService = RevenueService;
exports.RevenueService = RevenueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RevenueService);
//# sourceMappingURL=revenue.service.js.map