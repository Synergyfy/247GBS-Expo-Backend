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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventService = class EventService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEvent(createEventDto) {
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
    async getAllEvents(query) {
        const { status, sortBy, sortOrder } = query;
        const where = {};
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
            orderBy: sortBy && sortOrder ? (sortBy === 'sales'
                ? { tickets: { _count: sortOrder } }
                : sortBy === 'createdAt' || sortBy === 'startDate'
                    ? { [sortBy]: sortOrder }
                    : undefined) : undefined,
        });
        return events.map(event => {
            const uniqueAttendees = new Set(event.tickets.map(t => t.userId)).size;
            const totalRevenue = event.tickets.reduce((sum, ticket) => sum + Number(ticket.price), 0);
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
    async getEventById(id) {
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
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async updateEvent(id, updateEventDto) {
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
    async buyTicket(userId, eventId, type, price) {
        return this.prisma.ticket.create({
            data: {
                userId,
                eventId,
                type,
                price,
            },
        });
    }
    async getMyTickets(userId) {
        return this.prisma.ticket.findMany({
            where: { userId },
            include: {
                event: true,
            },
        });
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventService);
//# sourceMappingURL=event.service.js.map