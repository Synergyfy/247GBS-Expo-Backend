import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { RedemptionService } from './redemption.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/products/redemption')
@UseGuards(JwtAuthGuard)
export class RedemptionController {
    constructor(private readonly redemptionService: RedemptionService) { }

    @Get('visitor/:identifier')
    findOrdersByVisitor(@GetUser('userId') userId: string, @Param('identifier') identifier: string) {
        return this.redemptionService.findOrdersByVisitor(userId, identifier);
    }

    @Post('redeem/:orderId')
    redeemOrder(@GetUser('userId') userId: string, @Param('orderId') orderId: string) {
        return this.redemptionService.redeemOrder(userId, orderId);
    }
}
