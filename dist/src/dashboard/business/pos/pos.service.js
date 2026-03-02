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
exports.POSService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let POSService = class POSService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBoothForUser(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth)
            throw new common_1.NotFoundException('Business booth not found for this user');
        return booth;
    }
    async getDevices(userId, eventId) {
        try {
            const booth = await this.getBoothForUser(userId);
            return await this.prisma.scanner.findMany({
                where: { boothId: booth.id, eventId },
                orderBy: { lastSeen: 'desc' }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch devices: ' + error.message);
        }
    }
    async pairDevice(userId, eventId, dto) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Device pairing failed: ' + error.message);
        }
    }
    async getAttendanceStats(userId, eventId) {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId },
                select: { capacity: true }
            });
            if (!event)
                throw new common_1.NotFoundException('Event not found');
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.BadRequestException('Failed to fetch attendance stats: ' + error.message);
        }
    }
    async checkInTicket(userId, eventId, ticketId, deviceId) {
        try {
            const scanner = await this.prisma.scanner.findFirst({
                where: { deviceId, booth: { ownerId: userId }, eventId }
            });
            if (!scanner)
                throw new common_1.ForbiddenException('Scanner not registered or access denied');
            const ticket = await this.prisma.ticket.findUnique({
                where: { id: ticketId, eventId }
            });
            if (!ticket)
                throw new common_1.NotFoundException('Ticket not found for this event');
            if (ticket.scanned)
                throw new common_1.BadRequestException('Ticket has already been scanned');
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Verification failed: ' + error.message);
        }
    }
};
exports.POSService = POSService;
exports.POSService = POSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], POSService);
//# sourceMappingURL=pos.service.js.map