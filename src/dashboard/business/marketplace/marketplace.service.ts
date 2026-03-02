import { Injectable, NotFoundException } from '@nestjs/common';
import { GetMarketplaceEventsDto } from './dto/get-marketplace-events.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MarketplaceService {
    constructor(private prisma: PrismaService) { }

    async getAllEvents(query: GetMarketplaceEventsDto) {
        const { search, category, type } = query;

        const where: Prisma.EventWhereInput = {
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

    async getEventById(id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });

        if (!event || event.status !== 'PUBLISHED') {
            throw new NotFoundException('Event not found');
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

    async checkout(userId: string, data: CheckoutDto) {
        const event = await this.prisma.event.findUnique({
            where: { id: data.eventId },
            include: {
                _count: {
                    select: { tickets: true },
                },
            },
        });

        if (!event || event.status !== 'PUBLISHED') {
            throw new NotFoundException('Event not found');
        }

        // Check capacity
        if (event._count.tickets >= event.capacity) {
            throw new Error('Sold out');
        }

        // Create ticket
        return this.prisma.ticket.create({
            data: {
                userId,
                eventId: data.eventId,
                type: data.type,
                price: data.price,
            },
        });
    }
}
