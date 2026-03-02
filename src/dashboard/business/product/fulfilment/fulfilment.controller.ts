import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { FulfilmentService } from './fulfilment.service';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { GetUser } from '../../../../auth/get-user.decorator';
import { CreateFulfilmentPointDto, UpdateFulfilmentPointDto } from './dto/fulfilment-point.dto';
import { UpdateFulfilmentSlotDto } from './dto/fulfilment-slot.dto';

@Controller('dashboard/business/products/fulfilment')
@UseGuards(JwtAuthGuard)
export class FulfilmentController {
    constructor(private readonly fulfilmentService: FulfilmentService) { }

    @Get('stats')
    getStats(@GetUser('userId') userId: string) {
        return this.fulfilmentService.getStats(userId);
    }

    @Get('inventory')
    getInventory(@GetUser('userId') userId: string) {
        return this.fulfilmentService.getInventory(userId);
    }

    @Get('points')
    getPoints(@GetUser('userId') userId: string) {
        return this.fulfilmentService.getPoints(userId);
    }

    @Post('points')
    createPoint(@GetUser('userId') userId: string, @Body() data: CreateFulfilmentPointDto) {
        return this.fulfilmentService.createPoint(userId, data);
    }

    @Patch('points/:id')
    updatePoint(@GetUser('userId') userId: string, @Param('id') id: string, @Body() data: UpdateFulfilmentPointDto) {
        return this.fulfilmentService.updatePoint(userId, id, data);
    }

    @Get('slots')
    getSlots(@GetUser('userId') userId: string) {
        return this.fulfilmentService.getSlots(userId);
    }

    @Patch('slots/:id')
    updateSlot(@GetUser('userId') userId: string, @Param('id') id: string, @Body() data: UpdateFulfilmentSlotDto) {
        return this.fulfilmentService.updateSlot(userId, id, data);
    }

    @Get('exceptions')
    getExceptions(@GetUser('userId') userId: string) {
        return this.fulfilmentService.getExceptions(userId);
    }

    @Patch('exceptions/:id/resolve')
    resolveException(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.fulfilmentService.resolveException(userId, id);
    }

    @Post('exceptions/:id/notify')
    notifyCustomers(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.fulfilmentService.notifyCustomers(userId, id);
    }

    @Post('substitute/:productId')
    handleSubstitution(@GetUser('userId') userId: string, @Param('productId') productId: string) {
        return this.fulfilmentService.handleSubstitution(userId, productId);
    }
}
