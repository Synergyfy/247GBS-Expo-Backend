import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NetworkService } from './network.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('network')
@UseGuards(JwtAuthGuard)
export class NetworkController {
    constructor(private readonly networkService: NetworkService) { }

    @Get('tree')
    getReferralTree(@GetUser('userId') userId: string) {
        return this.networkService.getReferralTree(userId);
    }

    @Get('stats')
    getNetworkStats(@GetUser('userId') userId: string) {
        return this.networkService.getNetworkStats(userId);
    }

    @Post('join')
    joinNetwork(@GetUser('userId') userId: string, @Body() data: { referrerId: string }) {
        return this.networkService.setReferrer(userId, data.referrerId);
    }
}
