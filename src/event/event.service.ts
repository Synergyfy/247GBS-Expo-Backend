import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) { }

    async createEvent(createEventDto: CreateEventDto) {
        const { tickets, eventType, format, ...data } = createEventDto;

        return this.prisma.event.create({
            data: {
                ...data,
                startDate: new Date(data.startDate),
                 endDate: new Date(data.endDate),
                format: format || 'VIRTUAL',
                category: eventType || data.category,
                ticketTiers: tickets ? {
                    create: tickets.map(t => ({
                        name: t.name,
                        price: t.price,
                        quantity: t.quantity,
                        rules: t.rules,
                    })),
                } : undefined,
            },
        });
    }

    async getAllEvents(query: GetEventsQueryDto) {
        const { status, sortBy, sortOrder } = query;

        const where: Prisma.EventWhereInput = {};

        if (status) {
            where.status = status;
        }

        const events = await this.prisma.event.findMany({
            where,
            include: {
                tickets: {
                    select: {
                        price: true,
                        userId: true,
                    },
                },
            },
            orderBy: sortBy && sortOrder ? (
                sortBy === 'sales'
                    ? { tickets: { _count: sortOrder } }
                    : sortBy === 'createdAt' || sortBy === 'startDate'
                        ? { [sortBy]: sortOrder }
                        : undefined
            ) : undefined,
        });

        // Calculate metrics and return
        // Note: For large datasets, this in-memory calculation might be slow.
        // Consider raw SQL or separate aggregation queries for production scaling.
        return events.map(event => {
            const uniqueAttendees = new Set(event.tickets.map(t => t.userId)).size;
            // Revenue calculation: Sum of ticket prices. Handle Decimal properly if needed.
            // Assuming price is Decimal, using .toNumber() or treating as number for simplicity in this context.
            // If strictly typed as Decimal, use reduce with Decimal methods.
            const totalRevenue = event.tickets.reduce((sum, ticket) => sum + Number(ticket.price), 0);

            // Hide tickets detail if not needed, or keep for debugging
            // Returning event with computed fields
            const { tickets, ...eventData } = event;
            return {
                ...eventData,
                uniqueAttendees,
                totalRevenue,
                sales: tickets.length,
            };
        }).sort((a, b) => {
            if (sortBy === 'revenue' && sortOrder) {
                return sortOrder === 'asc' ? a.totalRevenue - b.totalRevenue : b.totalRevenue - a.totalRevenue;
            }
            return 0;
        });
    }

    async getEventById(id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                tickets: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }

    async updateEvent(id: string, updateEventDto: UpdateEventDto) {
        const { tickets, eventType, format, ...data } = updateEventDto;

        return this.prisma.event.update({
            where: { id },
            data: {
                ...data,
                format: format,
                category: eventType || data.category,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
            },
        });
    }

    async buyTicket(userId: string, eventId: string, type: string, price: number) {
        return this.prisma.ticket.create({
            data: {
                userId,
                eventId,
                type,
                price,
            },
        });
    }

    async getMyTickets(userId: string) {
        return this.prisma.ticket.findMany({
            where: { userId },
            include: {
                event: true,
            },
        });
    }
}
