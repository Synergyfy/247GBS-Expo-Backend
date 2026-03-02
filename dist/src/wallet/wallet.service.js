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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWallet(userId) {
        let wallet = await this.prisma.wallet.findUnique({
            where: { userId },
            include: {
                transactions: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                },
            },
        });
        if (!wallet) {
            wallet = await this.prisma.wallet.create({
                data: {
                    userId,
                },
                include: {
                    transactions: true,
                },
            });
        }
        return wallet;
    }
    async getTransactionHistory(userId) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found');
        }
        return this.prisma.transaction.findMany({
            where: { walletId: wallet.id },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateBalance(userId, amount, type, description) {
        const wallet = await this.getWallet(userId);
        return this.prisma.$transaction(async (tx) => {
            await tx.transaction.create({
                data: {
                    walletId: wallet.id,
                    amount,
                    type,
                    description,
                },
            });
            return tx.wallet.update({
                where: { id: wallet.id },
                data: {
                    cash: {
                        increment: amount,
                    },
                },
            });
        });
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map