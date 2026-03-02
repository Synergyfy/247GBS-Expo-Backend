import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/revenue')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('BUSINESS_OWNER', 'VENDOR')
export class RevenueController {
    constructor(private readonly revenueService: RevenueService) { }

    @Get('wallet')
    async getWallet(@GetUser('userId') userId: string) {
        return this.revenueService.getWallet(userId);
    }

    @Get('payouts')
    async getPayoutSchedule(@GetUser('userId') userId: string) {
        return this.revenueService.getPayoutSchedule(userId);
    }

    @Get('ledger')
    async getLedger(@GetUser('userId') userId: string) {
        return this.revenueService.getLedgerTransactions(userId);
    }

    @Patch('settings')
    async updateSettings(
        @GetUser('userId') userId: string,
        @Body() body: { settlementRule?: string; autoPayout?: boolean }
    ) {
        return this.revenueService.updateSettings(userId, body);
    }

    @Get('tickets')
    async getFinanceTickets(@GetUser('userId') userId: string) {
        return this.revenueService.getFinanceTickets(userId);
    }

    @Get('tickets/:id')
    async getFinanceTicketById(
        @GetUser('userId') userId: string,
        @Param('id') id: string
    ) {
        return this.revenueService.getFinanceTicketById(userId, id);
    }

    @Post('tickets')
    async createFinanceTicket(
        @GetUser('userId') userId: string,
        @Body() body: { subject: string; description: string; type?: string }
    ) {
        return this.revenueService.openFinanceTicket(userId, body);
    }
}

