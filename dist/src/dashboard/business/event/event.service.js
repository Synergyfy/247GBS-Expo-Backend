"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardEventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let DashboardEventService = class DashboardEventService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMyEvent(userId, createEventDto) {
        const { tickets, eventType, format, ...data } = createEventDto;
        return this.prisma.event.create({
            data: {
                ...data,
                ownerId: userId,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                format: format || 'VIRTUAL',
                category: eventType || data.category,
                status: 'DRAFT',
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
    async findMyEvents(userId, query) {
        const { status, search, sortBy, sortOrder } = query;
        const where = { ownerId: userId };
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
                let pipelineStep = 1;
                if (event.status === 'PUBLISHED')
                    pipelineStep = 5;
                if (event.status === 'COMPLETED')
                    pipelineStep = 6;
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
    async checkInTicket(userId, ticketId) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
            include: {
                event: true,
            },
        });
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        if (ticket.event.ownerId !== userId) {
            throw new common_1.ForbiddenException('This ticket does not belong to your event');
        }
        if (ticket.scanned) {
            throw new common_1.ConflictException('Ticket already scanned');
        }
        return this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                scanned: true,
                scannedAt: new Date(),
            },
        });
    }
    async findMyEventById(userId, id) {
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
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.ownerId !== userId) {
            throw new common_1.ForbiddenException('You do not own this event');
        }
        return event;
    }
    async updateMyEvent(userId, id, updateEventDto) {
        const event = await this.findMyEventById(userId, id);
        const { format, ...data } = updateEventDto;
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
    async deleteMyEvent(userId, id) {
        const event = await this.findMyEventById(userId, id);
        return this.prisma.event.delete({
            where: { id: event.id },
        });
    }
    async getSessions(userId, eventId) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.session.findMany({
            where: { eventId },
            include: { speaker: true },
            orderBy: { time: 'asc' },
        });
    }
    async createSession(userId, eventId, data) {
        await this.findMyEventById(userId, eventId);
        const { speakerId, ...rest } = data;
        const sessionData = { ...rest, eventId };
        if (speakerId && speakerId.trim() !== '') {
            sessionData.speakerId = speakerId;
        }
        return this.prisma.session.create({
            data: sessionData,
            include: { speaker: true },
        });
    }
    async updateSession(userId, eventId, sessionId, data) {
        await this.findMyEventById(userId, eventId);
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
        if (!session || session.eventId !== eventId) {
            throw new common_1.NotFoundException('Session not found');
        }
        return this.prisma.session.update({
            where: { id: sessionId },
            data,
            include: { speaker: true },
        });
    }
    async deleteSession(userId, eventId, sessionId) {
        await this.findMyEventById(userId, eventId);
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
        if (!session || session.eventId !== eventId) {
            throw new common_1.NotFoundException('Session not found');
        }
        return this.prisma.session.delete({ where: { id: sessionId } });
    }
    async getSpeakers(userId, eventId) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.speaker.findMany({
            where: { eventId },
            include: { sessions: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createSpeaker(userId, eventId, data) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.speaker.create({
            data: {
                ...data,
                eventId,
            },
        });
    }
    async updateSpeaker(userId, eventId, speakerId, data) {
        await this.findMyEventById(userId, eventId);
        const speaker = await this.prisma.speaker.findUnique({ where: { id: speakerId } });
        if (!speaker || speaker.eventId !== eventId) {
            throw new common_1.NotFoundException('Speaker not found');
        }
        return this.prisma.speaker.update({
            where: { id: speakerId },
            data,
        });
    }
    async deleteSpeaker(userId, eventId, speakerId) {
        await this.findMyEventById(userId, eventId);
        const speaker = await this.prisma.speaker.findUnique({ where: { id: speakerId } });
        if (!speaker || speaker.eventId !== eventId) {
            throw new common_1.NotFoundException('Speaker not found');
        }
        return this.prisma.speaker.delete({ where: { id: speakerId } });
    }
    async getBoothLayout(userId, eventId) {
        const event = await this.findMyEventById(userId, eventId);
        return { layout: event.boothLayout || null };
    }
    async saveBoothLayout(userId, eventId, layout) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.event.update({
            where: { id: eventId },
            data: { boothLayout: layout },
            select: { id: true, boothLayout: true },
        });
    }
    async getEventProducts(userId, eventId) {
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
    async getMyInventory(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: {
                products: {
                    where: { status: 'ACTIVE' },
                },
            },
        });
        if (!booth) {
            return [];
        }
        return booth.products;
    }
    async linkProducts(userId, eventId, productIds) {
        await this.findMyEventById(userId, eventId);
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: { products: true },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth');
        }
        const boothProductIds = booth.products.map(p => p.id);
        const invalidProducts = productIds.filter(id => !boothProductIds.includes(id));
        if (invalidProducts.length > 0) {
            throw new common_1.ForbiddenException('Some products do not belong to your booth');
        }
        const links = await Promise.all(productIds.map(productId => this.prisma.eventProduct.create({
            data: { eventId, productId },
            include: { product: true },
        })));
        return links.map(link => link.product);
    }
    async unlinkProduct(userId, eventId, productId) {
        await this.findMyEventById(userId, eventId);
        const eventProduct = await this.prisma.eventProduct.findFirst({
            where: { eventId, productId },
        });
        if (!eventProduct) {
            throw new common_1.NotFoundException('Product not linked to this event');
        }
        return this.prisma.eventProduct.delete({
            where: { id: eventProduct.id },
        });
    }
};
exports.DashboardEventService = DashboardEventService;
exports.DashboardEventService = DashboardEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardEventService);
//# sourceMappingURL=event.service.js.map