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
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MarketplaceService = class MarketplaceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllEvents(query) {
        const { search, category, type } = query;
        const where = {
            status: 'PUBLISHED',
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { organizer: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category && category !== 'All') {
            where.category = category;
        }
        if (type) {
            where.type = type;
        }
        return this.prisma.event.findMany({
            where,
            orderBy: {
                startDate: 'asc',
            },
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });
    }
    async getEventById(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });
        if (!event || event.status !== 'PUBLISHED') {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async getCategories() {
        const events = await this.prisma.event.findMany({
            where: { status: 'PUBLISHED' },
            select: { category: true },
            distinct: ['category'],
        });
        return events.map(e => e.category);
    }
    async checkout(userId, data) {
        const event = await this.prisma.event.findUnique({
            where: { id: data.eventId },
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });
        if (!event || event.status !== 'PUBLISHED') {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event._count.tickets >= event.capacity) {
            throw new Error('Sold out');
        }
        return this.prisma.ticket.create({
            data: {
                userId,
                eventId: data.eventId,
                type: data.type,
                price: data.price,
            },
        });
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map