import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    @UseGuards(JwtAuthGuard) // Should eventually use a RolesGuard for ADMIN
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.createEvent(createEventDto);
    }

    @Get()
    findAll(@Query() query: GetEventsQueryDto) {
        return this.eventService.getAllEvents(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventService.getEventById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.updateEvent(id, updateEventDto);
    }

    @Post(':id/buy-ticket')
    @UseGuards(JwtAuthGuard)
    buyTicket(
        @GetUser('userId') userId: string,
        @Param('id') eventId: string,
        @Body() body: { type: string; price: number },
    ) {
        return this.eventService.buyTicket(userId, eventId, body.type, body.price);
    }

    @Get('my/tickets')
    @UseGuards(JwtAuthGuard)
    getMyTickets(@GetUser('userId') userId: string) {
        return this.eventService.getMyTickets(userId);
    }
}
