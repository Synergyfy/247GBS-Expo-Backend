import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/rewards/monitoring')
@UseGuards(JwtAuthGuard)
export class RewardsMonitoringController {
    constructor(private readonly rewardsService: RewardsService) { }

    @Get('stats')
    getMonitoringStats(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.getMonitoringStats(userId, eventId);
    }

    @Get('logs')
    getRewardLogs(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Query('search') search?: string,
    ) {
        return this.rewardsService.getRewardLogs(userId, eventId, search);
    }

    @Get('alerts')
    getAbuseAlerts(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.getAbuseAlerts(userId, eventId);
    }

    @Post('block-ip')
    blockIP(
        @GetUser('userId') userId: string,
        @Body('ipAddress') ipAddress: string,
        @Body('reason') reason?: string,
    ) {
        return this.rewardsService.blockIP(userId, ipAddress, reason);
    }
}
