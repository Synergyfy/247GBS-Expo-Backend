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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTicketTiers(userId, eventId) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.ticketTier.findMany({
            where: { eventId },
            include: {
                bundledProducts: {
                    include: { product: true }
                },
                _count: {
                    select: { tickets: true }
                }
            },
            orderBy: { price: 'asc' },
        });
    }
    async createTicketTier(userId, eventId, dto) {
        const event = await this.findMyEventById(userId, eventId);
        const { productIds, eventCapacity, saleStart, saleEnd, status, stockTracking, autoLock, waitlist, ...ticketData } = dto;
        if (typeof eventCapacity === 'number') {
            await this.prisma.event.update({
                where: { id: eventId },
                data: { capacity: eventCapacity },
            });
        }
        return this.prisma.ticketTier.create({
            data: {
                ...ticketData,
                eventId,
                status: status || 'Active',
                stockTracking: stockTracking ?? true,
                autoLock: autoLock ?? true,
                waitlist: waitlist ?? false,
                saleStart: saleStart ? new Date(saleStart) : undefined,
                saleEnd: saleEnd ? new Date(saleEnd) : undefined,
                bundledProducts: productIds ? {
                    create: productIds.map(id => ({
                        product: { connect: { id } }
                    }))
                } : undefined,
            },
            include: {
                bundledProducts: {
                    include: { product: true }
                }
            }
        });
    }
    async updateTicketTier(userId, eventId, tierId, dto) {
        await this.findMyEventById(userId, eventId);
        const { productIds, eventCapacity, saleStart, saleEnd, status, stockTracking, autoLock, waitlist, ...ticketData } = dto;
        const tier = await this.prisma.ticketTier.findFirst({
            where: { id: tierId, eventId },
        });
        if (!tier) {
            throw new common_1.NotFoundException('Ticket tier not found');
        }
        if (typeof eventCapacity === 'number') {
            await this.prisma.event.update({
                where: { id: eventId },
                data: { capacity: eventCapacity },
            });
        }
        if (productIds) {
            await this.prisma.ticketTierProduct.deleteMany({
                where: { ticketTierId: tierId },
            });
        }
        return this.prisma.ticketTier.update({
            where: { id: tierId },
            data: {
                ...ticketData,
                status,
                stockTracking,
                autoLock,
                waitlist,
                saleStart: saleStart ? new Date(saleStart) : undefined,
                saleEnd: saleEnd ? new Date(saleEnd) : undefined,
                bundledProducts: productIds ? {
                    create: productIds.map(id => ({
                        product: { connect: { id } }
                    }))
                } : undefined,
            },
            include: {
                bundledProducts: {
                    include: { product: true }
                }
            }
        });
    }
    async deleteTicketTier(userId, eventId, tierId) {
        await this.findMyEventById(userId, eventId);
        const tier = await this.prisma.ticketTier.findFirst({
            where: { id: tierId, eventId },
            include: { _count: { select: { tickets: true } } }
        });
        if (!tier) {
            throw new common_1.NotFoundException('Ticket tier not found');
        }
        if (tier._count.tickets > 0) {
            throw new common_1.ConflictException('Cannot delete ticket tier with sold tickets');
        }
        return this.prisma.ticketTier.delete({
            where: { id: tierId },
        });
    }
    async findMyEventById(userId, id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.ownerId !== userId) {
            throw new common_1.ForbiddenException('You do not own this event');
        }
        return event;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map