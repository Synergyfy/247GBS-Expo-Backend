import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/rewards/integrations')
@UseGuards(JwtAuthGuard)
export class RewardsIntegrationController {
    constructor(private readonly rewardsService: RewardsService) { }

    @Get('status')
    getIntegrationStatus(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.getIntegrationStatus(userId, eventId);
    }

    @Get('list')
    listIntegrations(
        @GetUser('userId') userId: string,
        @Query('eventId') eventId: string,
    ) {
        return this.rewardsService.listIntegrations(userId, eventId);
    }
}
