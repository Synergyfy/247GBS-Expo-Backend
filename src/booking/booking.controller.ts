import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    create(@GetUser('userId') userId: string, @Body() data: any) {
        return this.bookingService.createBooking(userId, data);
    }

    @Get('my')
    getMyBookings(@GetUser('userId') userId: string) {
        return this.bookingService.getMyBookings(userId);
    }

    @Get('booth/:boothId')
    getBoothBookings(@Param('boothId') boothId: string) {
        return this.bookingService.getBoothBookings(boothId);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.bookingService.updateStatus(id, status);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }
}
