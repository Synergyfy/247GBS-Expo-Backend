import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';

@Injectable()
export class TicketsService {
    constructor(private prisma: PrismaService) { }

    async getTicketTiers(userId: string, eventId: string) {
        await this.findMyEventById(userId, eventId);
        return this.prisma.ticketTier.findMany({
            where: { eventId },
            include: {
                bundledProducts: {
                    include: { product: true }
                },
                _count: {
                    select: { tickets: true } // Sold count
                }
            },
            orderBy: { price: 'asc' },
        });
    }

    async createTicketTier(userId: string, eventId: string, dto: CreateTicketTierDto) {
        const event = await this.findMyEventById(userId, eventId);
        const { productIds, eventCapacity, saleStart, saleEnd, status, stockTracking, autoLock, waitlist, ...ticketData } = dto;

        // Optionally update event capacity
        if (typeof eventCapacity === 'number') {
            await this.prisma.event.update({
                where: { id: eventId },
                data: { capacity: eventCapacity },
            });
        }

        return this.prisma.ticketTier.create({
            data: {
                ...ticketData as any,
                eventId,
                status: status || 'Active',
                stockTracking: stockTracking ?? true,
                autoLock: autoLock ?? true,
                waitlist: waitlist ?? false,
                // Parse date strings to Date objects if provided
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

    async updateTicketTier(userId: string, eventId: string, tierId: string, dto: UpdateTicketTierDto) {
        await this.findMyEventById(userId, eventId);
        const { productIds, eventCapacity, saleStart, saleEnd, status, stockTracking, autoLock, waitlist, ...ticketData } = dto;

        const tier = await this.prisma.ticketTier.findFirst({
            where: { id: tierId, eventId },
        });

        if (!tier) {
            throw new NotFoundException('Ticket tier not found');
        }

        // Optionally update event capacity
        if (typeof eventCapacity === 'number') {
            await this.prisma.event.update({
                where: { id: eventId },
                data: { capacity: eventCapacity },
            });
        }

        // Handle bundled products update if provided
        if (productIds) {
            // First delete existing links
            await this.prisma.ticketTierProduct.deleteMany({
                where: { ticketTierId: tierId },
            });
        }

        return this.prisma.ticketTier.update({
            where: { id: tierId },
            data: {
                ...ticketData as any,
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

    async deleteTicketTier(userId: string, eventId: string, tierId: string) {
        await this.findMyEventById(userId, eventId);

        const tier = await this.prisma.ticketTier.findFirst({
            where: { id: tierId, eventId },
            include: { _count: { select: { tickets: true } } }
        });

        if (!tier) {
            throw new NotFoundException('Ticket tier not found');
        }

        if (tier._count.tickets > 0) {
            throw new ConflictException('Cannot delete ticket tier with sold tickets');
        }

        return this.prisma.ticketTier.delete({
            where: { id: tierId },
        });
    }

    private async findMyEventById(userId: string, id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        if (event.ownerId !== userId) {
            throw new ForbiddenException('You do not own this event');
        }

        return event;
    }
}
