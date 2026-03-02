import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Get()
    getWallet(@GetUser('userId') userId: string) {
        return this.walletService.getWallet(userId);
    }

    @Get('transactions')
    getTransactions(@GetUser('userId') userId: string) {
        return this.walletService.getTransactionHistory(userId);
    }

    @Post('add-funds')
    // This is a mockup endpoint, in reality this would be triggered by external payments or reward actions
    addFunds(@GetUser('userId') userId: string, @Body() data: { amount: number; description?: string }) {
        return this.walletService.updateBalance(userId, data.amount, 'EARNING', data.description);
    }
}
