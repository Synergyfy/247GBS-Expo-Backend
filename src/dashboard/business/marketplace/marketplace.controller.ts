import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { GetMarketplaceEventsDto } from './dto/get-marketplace-events.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('marketplace')
export class MarketplaceController {
    constructor(private readonly marketplaceService: MarketplaceService) { }

    @Get('events')
    findAll(@Query() query: GetMarketplaceEventsDto) {
        return this.marketplaceService.getAllEvents(query);
    }

    @Get('categories')
    getCategories() {
        return this.marketplaceService.getCategories();
    }

    @Post('checkout')
    checkout(@Query('userId') userId: string, @Body() data: CheckoutDto) {
        // userId is assumed to come from auth/query for now
        return this.marketplaceService.checkout(userId, data);
    }

    @Get('events/:id')
    findOne(@Param('id') id: string) {
        return this.marketplaceService.getEventById(id);
    }
}
