import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { PurchaseBundleDto } from './dto/purchase-bundle.dto';
import { AllocateTicketsDto } from './dto/allocate-tickets.dto';

@Controller('dashboard/business/rewards')
@UseGuards(JwtAuthGuard)
export class RewardsController {
    constructor(private readonly rewardsService: RewardsService) { }

    @Get('stats')
    getRewardStats(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.getRewardStats(userId, eventId);
    }

    @Post('purchase')
    purchaseBundle(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Body() dto: PurchaseBundleDto,
    ) {
        return this.rewardsService.purchaseBundle(userId, eventId, dto);
    }

    @Post('allocate')
    allocateTickets(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Body() dto: AllocateTicketsDto,
    ) {
        return this.rewardsService.allocateTickets(userId, eventId, dto);
    }

    @Get('campaigns')
    getRewardCampaigns(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.getRewardCampaigns(userId, eventId);
    }
}
