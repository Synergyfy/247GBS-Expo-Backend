import { Controller, Get, Post, Body, Query, UseGuards, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { OperationsService } from './operations.service';
import { AssignStaffDto } from './dto/assign-staff.dto';

@Controller('dashboard/business/operations')
@UseGuards(JwtAuthGuard)
export class OperationsController {
    constructor(private readonly operationsService: OperationsService) { }

    @Get('staff')
    async getStaff(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getStaff(userId, eventId);
    }

    @Post('staff')
    async assignStaff(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
        @Body() dto: AssignStaffDto
    ) {
        return this.operationsService.assignStaff(userId, eventId, dto);
    }

    @Patch('staff/:id/status')
    async updateStaffStatus(
        @GetUser('userId') userId: string,
        @Param('id') staffId: string,
        @Body('status') status: string
    ) {
        return this.operationsService.updateStaffStatus(userId, staffId, status);
    }

    @Get('diagnostics')
    async getDiagnostics(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getDiagnostics(userId, eventId);
    }

    @Post('diagnostics/run')
    async runDiagnostics(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.runDiagnostics(userId, eventId);
    }

    @Get('verification/logs')
    async getVerificationLogs(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getVerificationLogs(userId, eventId);
    }

    @Get('verification/status')
    async getVerificationStatus(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getStationStatus(userId, eventId);
    }

    @Get('crowd/stats')
    async getCrowdStats(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getCrowdStats(userId, eventId);
    }

    @Get('crowd/zones')
    async getZoneTraffic(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getZoneTraffic(userId, eventId);
    }

    @Get('crowd/insights')
    async getCrowdInsights(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.getCrowdInsights(userId, eventId);
    }

    @Post('sync')
    async syncDatabase(@GetUser('userId') userId: string, @Query('eventId') eventId: string) {
        return this.operationsService.syncDatabase(userId, eventId);
    }
}
