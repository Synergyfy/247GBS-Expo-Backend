import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }

    async createBooking(userId: string, data: any) {
        const { boothId, startTime, endTime, notes } = data;
        return this.prisma.appointment.create({
            data: {
                userId,
                boothId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                notes,
            },
        });
    }

    async getMyBookings(userId: string) {
        return this.prisma.appointment.findMany({
            where: { userId },
            include: {
                booth: true,
            },
        });
    }

    async getBoothBookings(boothId: string) {
        return this.prisma.appointment.findMany({
            where: { boothId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async updateStatus(id: string, status: string) {
        return this.prisma.appointment.update({
            where: { id },
            data: { status },
        });
    }

    async findOne(id: string) {
        const booking = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                booth: true,
                user: true,
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        return booking;
    }
}
