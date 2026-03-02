import { Controller, Get, Post, Patch, Body, Param, UseGuards, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateSalesAssetDto } from './dto/create-sales-asset.dto';
import { TrackVisitDto } from './dto/track-visit.dto';

@Controller('dashboard/business/sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Get('stats')
    getSalesStats(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string
    ) {
        return this.salesService.getSalesStats(userId, eventId);
    }

    @Get('channels')
    getChannelsData(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string
    ) {
        return this.salesService.getChannelsData(userId, eventId);
    }

    @Get('channels/:channel/performance')
    getChannelPerformance(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Param('channel') channel: string
    ) {
        return this.salesService.getChannelPerformance(userId, eventId, channel);
    }

    @Post('campaigns')
    createCampaign(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Body() dto: CreateCampaignDto
    ) {
        return this.salesService.createCampaign(userId, eventId, dto);
    }

    @Get('campaigns')
    getCampaigns(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string
    ) {
        return this.salesService.getCampaigns(userId, eventId);
    }

    @Post('track-visit')
    trackVisit(@Body() dto: TrackVisitDto) {
        return this.salesService.trackVisit(dto);
    }

    @Get('links')
    getSalesAssets(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Query('search') search?: string
    ) {
        return this.salesService.getSalesAssets(userId, eventId, search);
    }

    @Post('links')
    createSalesAsset(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Body() dto: CreateSalesAssetDto
    ) {
        return this.salesService.createSalesAsset(userId, eventId, dto);
    }
}
