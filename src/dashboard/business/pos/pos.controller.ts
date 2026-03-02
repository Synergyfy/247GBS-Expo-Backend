import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { POSService } from './pos.service';
import { PairScannerDto } from './dto/pair-scanner.dto';

@Controller('dashboard/business/pos')
@UseGuards(JwtAuthGuard)
export class POSController {
    constructor(private readonly posService: POSService) { }

    @Get('devices')
    async getDevices(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.posService.getDevices(userId, eventId);
    }

    @Post('pair')
    async pairDevice(@GetUser('userId') userId: string, @Query('eventId') eventId: string, @Body() dto: PairScannerDto) {
        return this.posService.pairDevice(userId, eventId, dto);
    }

    @Get('attendance')
    async getAttendanceStats(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.posService.getAttendanceStats(userId, eventId);
    }
}
