import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';

@Controller('dashboard/business/events') // Keep the same base route structure for frontend compatibility
@UseGuards(JwtAuthGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post(':eventId/ticket-tiers')
    createTicketTier(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Body() createTicketTierDto: CreateTicketTierDto,
    ) {
        return this.ticketsService.createTicketTier(userId, eventId, createTicketTierDto);
    }

    @Get(':eventId/ticket-tiers')
    getTicketTiers(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
    ) {
        return this.ticketsService.getTicketTiers(userId, eventId);
    }

    @Patch(':eventId/ticket-tiers/:tierId')
    updateTicketTier(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('tierId') tierId: string,
        @Body() updateTicketTierDto: UpdateTicketTierDto,
    ) {
        return this.ticketsService.updateTicketTier(userId, eventId, tierId, updateTicketTierDto);
    }

    @Delete(':eventId/ticket-tiers/:tierId')
    deleteTicketTier(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('tierId') tierId: string,
    ) {
        return this.ticketsService.deleteTicketTier(userId, eventId, tierId);
    }
}
