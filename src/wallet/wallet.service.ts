import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }

    async getWallet(userId: string) {
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
            // Create wallet if it doesn't exist
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

    async getTransactionHistory(userId: string) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
        });

        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        return this.prisma.transaction.findMany({
            where: { walletId: wallet.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateBalance(userId: string, amount: number, type: string, description?: string) {
        const wallet = await this.getWallet(userId);

        return this.prisma.$transaction(async (tx) => {
            // Create transaction record
            await tx.transaction.create({
                data: {
                    walletId: wallet.id,
                    amount,
                    type,
                    description,
                },
            });

            // Update wallet balance (assuming 'cash' for simplicity, could be points etc.)
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
}
