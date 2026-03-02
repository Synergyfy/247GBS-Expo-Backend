import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PairScannerDto } from './dto/pair-scanner.dto';

@Injectable()
export class POSService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found for this user');
        return booth;
    }

    async getDevices(userId: string, eventId: string) {
        try {
            const booth = await this.getBoothForUser(userId);
            return await this.prisma.scanner.findMany({
                where: { boothId: booth.id, eventId },
                orderBy: { lastSeen: 'desc' }
            });
        } catch (error) {
            throw new BadRequestException('Failed to fetch devices: ' + error.message);
        }
    }

    async pairDevice(userId: string, eventId: string, dto: PairScannerDto) {
        try {
            const booth = await this.getBoothForUser(userId);

            return await this.prisma.scanner.upsert({
                where: { deviceId: dto.deviceId },
                update: {
                    name: dto.name,
                    type: dto.type || 'HANDHELD',
                    status: 'ONLINE',
                    battery: dto.battery,
                    lastSeen: new Date(),
                    assignedStaff: dto.assignedStaff,
                    boothId: booth.id,
                    eventId: eventId
                },
                create: {
                    deviceId: dto.deviceId,
                    name: dto.name,
                    type: dto.type || 'HANDHELD',
                    status: 'ONLINE',
                    battery: dto.battery,
                    lastSeen: new Date(),
                    assignedStaff: dto.assignedStaff,
                    boothId: booth.id,
                    eventId: eventId
                }
            });
        } catch (error) {
            throw new BadRequestException('Device pairing failed: ' + error.message);
        }
    }

    async getAttendanceStats(userId: string, eventId: string) {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId },
                select: { capacity: true }
            });

            if (!event) throw new NotFoundException('Event not found');

            const scannedCount = await this.prisma.ticket.count({
                where: { eventId, scanned: true }
            });

            const totalCapacity = event.capacity;
            const occupancyRate = totalCapacity > 0 ? (scannedCount / totalCapacity) : 0;

            return {
                occupancy: {
                    scanned: scannedCount,
                    total: totalCapacity,
                    percentage: Math.round(occupancyRate * 100),
                    label: "Main Zone Occupancy"
                },
                status: occupancyRate > 0.9 ? "CRITICAL" : occupancyRate > 0.7 ? "BUSY" : "STABLE",
                insight: occupancyRate > 0.8
                    ? "Zone is approaching capacity. Consider opening alternative exits."
                    : "Flow is currently stable. Peak expected shortly."
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException('Failed to fetch attendance stats: ' + error.message);
        }
    }

    async checkInTicket(userId: string, eventId: string, ticketId: string, deviceId: string) {
        try {
            // Ensure the scanner is registered to this booth/event
            const scanner = await this.prisma.scanner.findFirst({
                where: { deviceId, booth: { ownerId: userId }, eventId }
            });

            if (!scanner) throw new ForbiddenException('Scanner not registered or access denied');

            const ticket = await this.prisma.ticket.findUnique({
                where: { id: ticketId, eventId }
            });

            if (!ticket) throw new NotFoundException('Ticket not found for this event');
            if (ticket.scanned) throw new BadRequestException('Ticket has already been scanned');

            // Update ticket and scanner status
            const updatedTicket = await this.prisma.$transaction(async (tx) => {
                await tx.scanner.update({
                    where: { deviceId },
                    data: { lastSeen: new Date(), status: 'ONLINE' }
                });

                return await tx.ticket.update({
                    where: { id: ticketId },
                    data: {
                        scanned: true,
                        scannedAt: new Date()
                    },
                    include: {
                        user: { select: { name: true } },
                        tier: { select: { name: true } }
                    }
                });
            });

            return {
                status: "Success",
                user: updatedTicket.user.name || "Unknown Visitor",
                ticketType: updatedTicket.tier?.name || "General Access",
                id: updatedTicket.id,
                timestamp: updatedTicket.scannedAt?.toLocaleTimeString() || new Date().toLocaleTimeString(),
                avatar: (updatedTicket.user.name || "U").charAt(0).toUpperCase()
            };
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException || error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Verification failed: ' + error.message);
        }
    }
}
