import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { DashboardEventService } from './event.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { CreateEventDto } from '../../../event/dto/create-event.dto';
import { UpdateEventDto } from '../../../event/dto/update-event.dto';
import { GetEventsQueryDto } from '../../../event/dto/get-events-query.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { LinkProductsDto } from './dto/link-products.dto';
import { SaveBoothLayoutDto } from './dto/save-booth-layout.dto';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';

@Controller('dashboard/business/events')
@UseGuards(JwtAuthGuard)
export class DashboardEventController {
    constructor(private readonly eventService: DashboardEventService) { }

    @Post()
    create(@GetUser('userId') userId: string, @Body() createEventDto: CreateEventDto) {
        return this.eventService.createMyEvent(userId, createEventDto);
    }

    @Get()
    findAll(@GetUser('userId') userId: string, @Query() query: GetEventsQueryDto) {
        return this.eventService.findMyEvents(userId, query);
    }

    @Post('check-in/:ticketId')
    checkIn(@GetUser('userId') userId: string, @Param('ticketId') ticketId: string) {
        return this.eventService.checkInTicket(userId, ticketId);
    }

    @Get(':id')
    findOne(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.eventService.findMyEventById(userId, id);
    }

    @Patch(':id')
    update(
        @GetUser('userId') userId: string,
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
    ) {
        return this.eventService.updateMyEvent(userId, id, updateEventDto);
    }

    @Delete(':id')
    remove(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.eventService.deleteMyEvent(userId, id);
    }

    // ============ SESSION ENDPOINTS ============
    @Get(':eventId/sessions')
    getSessions(@GetUser('userId') userId: string, @Param('eventId') eventId: string) {
        return this.eventService.getSessions(userId, eventId);
    }

    @Post(':eventId/sessions')
    createSession(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Body() createSessionDto: CreateSessionDto,
    ) {
        return this.eventService.createSession(userId, eventId, createSessionDto);
    }

    @Patch(':eventId/sessions/:sessionId')
    updateSession(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('sessionId') sessionId: string,
        @Body() updateSessionDto: UpdateSessionDto,
    ) {
        return this.eventService.updateSession(userId, eventId, sessionId, updateSessionDto);
    }

    @Delete(':eventId/sessions/:sessionId')
    deleteSession(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('sessionId') sessionId: string,
    ) {
        return this.eventService.deleteSession(userId, eventId, sessionId);
    }

    // ============ SPEAKER ENDPOINTS ============
    @Get(':eventId/speakers')
    getSpeakers(@GetUser('userId') userId: string, @Param('eventId') eventId: string) {
        return this.eventService.getSpeakers(userId, eventId);
    }

    @Post(':eventId/speakers')
    createSpeaker(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Body() createSpeakerDto: CreateSpeakerDto,
    ) {
        return this.eventService.createSpeaker(userId, eventId, createSpeakerDto);
    }

    @Patch(':eventId/speakers/:speakerId')
    updateSpeaker(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('speakerId') speakerId: string,
        @Body() updateSpeakerDto: UpdateSpeakerDto,
    ) {
        return this.eventService.updateSpeaker(userId, eventId, speakerId, updateSpeakerDto);
    }

    @Delete(':eventId/speakers/:speakerId')
    deleteSpeaker(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('speakerId') speakerId: string,
    ) {
        return this.eventService.deleteSpeaker(userId, eventId, speakerId);
    }



    // ============ BOOTH LAYOUT ENDPOINTS ============
    @Get(':eventId/booth-layout')
    getBoothLayout(@GetUser('userId') userId: string, @Param('eventId') eventId: string) {
        return this.eventService.getBoothLayout(userId, eventId);
    }

    @Put(':eventId/booth-layout')
    saveBoothLayout(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Body() saveBoothLayoutDto: SaveBoothLayoutDto,
    ) {
        return this.eventService.saveBoothLayout(userId, eventId, saveBoothLayoutDto.layout);
    }

    // ============ PRODUCT CATALOG ENDPOINTS ============
    @Get(':eventId/products')
    getEventProducts(@GetUser('userId') userId: string, @Param('eventId') eventId: string) {
        return this.eventService.getEventProducts(userId, eventId);
    }

    @Get('inventory/my-products')
    getMyInventory(@GetUser('userId') userId: string) {
        return this.eventService.getMyInventory(userId);
    }

    @Post(':eventId/products/link')
    linkProducts(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Body() linkProductsDto: LinkProductsDto,
    ) {
        return this.eventService.linkProducts(userId, eventId, linkProductsDto.productIds);
    }

    @Delete(':eventId/products/:productId')
    unlinkProduct(
        @GetUser('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('productId') productId: string,
    ) {
        return this.eventService.unlinkProduct(userId, eventId, productId);
    }
}
