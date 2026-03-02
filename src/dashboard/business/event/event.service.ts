import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventDto } from '../../../event/dto/create-event.dto';
import { UpdateEventDto } from '../../../event/dto/update-event.dto';
import { GetEventsQueryDto } from '../../../event/dto/get-events-query.dto';

@Injectable()
export class DashboardEventService {
    constructor(private prisma: PrismaService) { }

    async createMyEvent(userId: string, createEventDto: CreateEventDto) {
        const { tickets, eventType, format, ...data } = createEventDto;

        return this.prisma.event.create({
            data: {
                ...data,
                ownerId: userId,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                format: format || 'VIRTUAL',
                category: eventType || data.category, // Supporting 'What are you hosting?'
                status: 'DRAFT', // Events start in DRAFT for admin approval
                ticketTiers: tickets ? {
                    create: tickets.map(t => ({
                        name: t.name,
                        price: t.price,
                        quantity: t.quantity,
                        rules: t.rules,
                        bundledProducts: t.productIds ? {
                            create: t.productIds.map(productId => ({
                                product: {
                                    connect: { id: productId },
                                },
                            })),
                        } : undefined,
                    })),
                } : undefined,
            },
        });
    }

    async findMyEvents(userId: string, query: GetEventsQueryDto) {
        const { status, search, sortBy, sortOrder } = query;
        const where: any = { ownerId: userId };

        if (status) {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const events = await this.prisma.event.findMany({
            where,
            include: {
                _count: {
                    select: { tickets: true },
                },
                tickets: {
                    select: {
                        price: true,
                    },
                },
            },
            orderBy: {
                [sortBy || 'createdAt']: sortOrder || 'desc',
            },
        });

        // Calculate global stats for all events owned by user
        const allMyEvents = await this.prisma.event.findMany({
            where: { ownerId: userId },
            include: {
                tickets: {
                    select: {
                        userId: true,
                        price: true,
                    },
                },
            },
        });

        const totalTicketsSold = allMyEvents.reduce((acc, event) => acc + event.tickets.length, 0);
        const uniqueAttendeeIds = new Set();
        let totalRevenue = 0;

        allMyEvents.forEach(event => {
            event.tickets.forEach(ticket => {
                uniqueAttendeeIds.add(ticket.userId);
                totalRevenue += Number(ticket.price);
            });
        });

        return {
            events: events.map(event => {
                const eventRevenue = event.tickets.reduce((acc, t) => acc + Number(t.price), 0);
                let pipelineStep = 1; // Draft
                if (event.status === 'PUBLISHED') pipelineStep = 5;
                if (event.status === 'COMPLETED') pipelineStep = 6;

                return {
                    id: event.id,
                    title: event.name,
                    status: event.status.charAt(0) + event.status.slice(1).toLowerCase(),
                    pipelineStep,
                    date: event.startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                    location: event.location || 'TBD',
                    ticketsSold: event._count.tickets,
                    capacity: event.capacity,
                    revenue: `₦${eventRevenue.toLocaleString()}`,
                    type: event.type,
                };
            }),
            stats: {
                totalTicketsSold,
                totalUniqueAttendees: uniqueAttendeeIds.size,
                totalRevenue: `₦${totalRevenue.toLocaleString()}`,
            },
        };
    }

    async checkInTicket(userId: string, ticketId: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
            include: {
                event: true,
            },
        });

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        if (ticket.event.ownerId !== userId) {
            throw new ForbiddenException('This ticket does not belong to your event');
        }

        if (ticket.scanned) {
            throw new ConflictException('Ticket already scanned');
        }

        return this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                scanned: true,
                scannedAt: new Date(),
            },
        });
    }

    async findMyEventById(userId: string, id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                ticketTiers: true,
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

        if (event.ownerId !== userId) {
            throw new ForbiddenException('You do not own this event');
        }

        return event;
    }

    async updateMyEvent(userId: string, id: string, updateEventDto: UpdateEventDto) {
        const event = await this.findMyEventById(userId, id);
        const { format, ...data } = updateEventDto as any; // Cast for now as format might not be in UpdateEventDto yet

        return this.prisma.event.update({
            where: { id: event.id },
            data: {
                ...data,
                format: format,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
            },
        });
    }

    async deleteMyEvent(userId: string, id: string) {
        const event = await this.findMyEventById(userId, id);

        return this.prisma.event.delete({
            where: { id: event.id },
        });
    }

    // ============ SESSION MANAGEMENT ============
    async getSessions(userId: string, eventId: string) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.session.findMany({
            where: { eventId },
            include: { speaker: true },
            orderBy: { time: 'asc' },
        });
    }

    async createSession(userId: string, eventId: string, data: any) {
        await this.findMyEventById(userId, eventId);

        // Strip empty speakerId — an empty string is not a valid FK reference
        const { speakerId, ...rest } = data;
        const sessionData: any = { ...rest, eventId };
        if (speakerId && speakerId.trim() !== '') {
            sessionData.speakerId = speakerId;
        }

        return this.prisma.session.create({
            data: sessionData,
            include: { speaker: true },
        });
    }

    async updateSession(userId: string, eventId: string, sessionId: string, data: any) {
        await this.findMyEventById(userId, eventId);
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });

        if (!session || session.eventId !== eventId) {
            throw new NotFoundException('Session not found');
        }

        return this.prisma.session.update({
            where: { id: sessionId },
            data,
            include: { speaker: true },
        });
    }

    async deleteSession(userId: string, eventId: string, sessionId: string) {
        await this.findMyEventById(userId, eventId);
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });

        if (!session || session.eventId !== eventId) {
            throw new NotFoundException('Session not found');
        }

        return this.prisma.session.delete({ where: { id: sessionId } });
    }

    // ============ SPEAKER MANAGEMENT ============
    async getSpeakers(userId: string, eventId: string) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.speaker.findMany({
            where: { eventId },
            include: { sessions: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createSpeaker(userId: string, eventId: string, data: any) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.speaker.create({
            data: {
                ...data,
                eventId,
            },
        });
    }

    async updateSpeaker(userId: string, eventId: string, speakerId: string, data: any) {
        await this.findMyEventById(userId, eventId);
        const speaker = await this.prisma.speaker.findUnique({ where: { id: speakerId } });

        if (!speaker || speaker.eventId !== eventId) {
            throw new NotFoundException('Speaker not found');
        }

        return this.prisma.speaker.update({
            where: { id: speakerId },
            data,
        });
    }

    async deleteSpeaker(userId: string, eventId: string, speakerId: string) {
        await this.findMyEventById(userId, eventId);
        const speaker = await this.prisma.speaker.findUnique({ where: { id: speakerId } });

        if (!speaker || speaker.eventId !== eventId) {
            throw new NotFoundException('Speaker not found');
        }

        return this.prisma.speaker.delete({ where: { id: speakerId } });
    }

    // ============ BOOTH LAYOUT ============
    async getBoothLayout(userId: string, eventId: string) {
        const event = await this.findMyEventById(userId, eventId);
        return { layout: event.boothLayout || null };
    }

    async saveBoothLayout(userId: string, eventId: string, layout: any) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.event.update({
            where: { id: eventId },
            data: { boothLayout: layout },
            select: { id: true, boothLayout: true },
        });
    }

    // ============ PRODUCT CATALOGS ============
    async getEventProducts(userId: string, eventId: string) {
        await this.findMyEventById(userId, eventId);
        const eventProducts = await this.prisma.eventProduct.findMany({
            where: { eventId },
            include: {
                product: {
                    include: {
                        booth: true,
                    },
                },
            },
        });
        return eventProducts.map(ep => ep.product);
    }

    async getMyInventory(userId: string) {
        // Get user's booth and all products
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: {
                products: {
                    where: { status: 'ACTIVE' as any },
                },
            },
        });

        if (!booth) {
            return [];
        }

        return booth.products;
    }

    async linkProducts(userId: string, eventId: string, productIds: string[]) {
        await this.findMyEventById(userId, eventId);

        // Verify all products belong to user's booth
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: { products: true },
        });

        if (!booth) {
            throw new ForbiddenException('You do not have a booth');
        }

        const boothProductIds = booth.products.map(p => p.id);
        const invalidProducts = productIds.filter(id => !boothProductIds.includes(id));

        if (invalidProducts.length > 0) {
            throw new ForbiddenException('Some products do not belong to your booth');
        }

        // Create event-product links
        const links = await Promise.all(
            productIds.map(productId =>
                this.prisma.eventProduct.create({
                    data: { eventId, productId },
                    include: { product: true },
                })
            )
        );

        return links.map(link => link.product);
    }

    async unlinkProduct(userId: string, eventId: string, productId: string) {
        await this.findMyEventById(userId, eventId);

        const eventProduct = await this.prisma.eventProduct.findFirst({
            where: { eventId, productId },
        });

        if (!eventProduct) {
            throw new NotFoundException('Product not linked to this event');
        }

        return this.prisma.eventProduct.delete({
            where: { id: eventProduct.id },
        });
    }
    // ============ TICKET TIERS ============

}
