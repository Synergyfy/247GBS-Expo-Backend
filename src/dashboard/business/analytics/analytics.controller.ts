import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('sales')
    getSalesPerformance(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.analyticsService.getSalesPerformance(userId, eventId);
    }

    @Get('attendance')
    getAttendanceTraffic(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.analyticsService.getAttendanceTraffic(userId, eventId);
    }

    @Get('financial')
    getFinancialHealth(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.analyticsService.getFinancialHealth(userId, eventId);
    }
}
