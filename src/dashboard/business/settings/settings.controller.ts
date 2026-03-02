import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AssignStaffDto } from '../operations/dto/assign-staff.dto';

@Controller('dashboard/business/settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get('profile')
    async getProfile(@GetUser('userId') userId: string) {
        return this.settingsService.getProfile(userId);
    }

    @Patch('profile')
    async updateProfile(@GetUser('userId') userId: string, @Body() data: UpdateProfileDto) {
        return this.settingsService.updateProfile(userId, data);
    }

    @Get('team')
    async getTeam(@GetUser('userId') userId: string) {
        return this.settingsService.getTeam(userId);
    }

    @Post('team')
    async addTeamMember(@GetUser('userId') userId: string, @Body() data: AssignStaffDto) {
        return this.settingsService.addTeamMember(userId, data);
    }

    @Delete('team/:id')
    async removeTeamMember(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.settingsService.removeTeamMember(userId, id);
    }

    @Get('integrations')
    async getIntegrations(@GetUser('userId') userId: string) {
        return this.settingsService.getIntegrations(userId);
    }

    @Get('audit-logs')
    async getAuditLogs(@GetUser('userId') userId: string) {
        return this.settingsService.getAuditLogs(userId);
    }
}
