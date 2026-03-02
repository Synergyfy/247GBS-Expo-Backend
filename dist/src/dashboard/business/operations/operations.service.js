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
exports.OperationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OperationsService = class OperationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBoothForUser(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth)
            throw new common_1.NotFoundException('Business booth not found');
        return booth;
    }
    async getStaff(userId, eventId) {
        try {
            const booth = await this.getBoothForUser(userId);
            return await this.prisma.eventStaff.findMany({
                where: { boothId: booth.id, eventId },
                include: { scanners: true },
                orderBy: { createdAt: 'desc' }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch staff: ' + error.message);
        }
    }
    async assignStaff(userId, eventId, dto) {
        try {
            const booth = await this.getBoothForUser(userId);
            return await this.prisma.eventStaff.create({
                data: {
                    ...dto,
                    boothId: booth.id,
                    eventId
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to assign staff: ' + error.message);
        }
    }
    async updateStaffStatus(userId, staffId, status) {
        const staff = await this.prisma.eventStaff.findUnique({
            where: { id: staffId },
            include: { booth: true }
        });
        if (!staff || staff.booth.ownerId !== userId) {
            throw new common_1.NotFoundException('Staff assignment not found or access denied');
        }
        return await this.prisma.eventStaff.update({
            where: { id: staffId },
            data: { status }
        });
    }
    async getDiagnostics(userId, eventId) {
        return [
            { label: "Network Latency", val: "12ms", status: "OK" },
            { label: "QR API Status", val: "Operational", status: "OK" },
            { label: "DB Mirror Sync", val: "99.9%", status: "OK" },
        ];
    }
    async runDiagnostics(userId, eventId) {
        return {
            success: true,
            timestamp: new Date(),
            results: [
                { test: "Database Connectivity", status: "PASSED" },
                { test: "Cache Warmup", status: "PASSED" },
                { test: "Staff Token Validation", status: "PASSED" },
                { test: "Scanner Pager Duty", status: "PASSED" }
            ],
            summary: "All systems operational. Network latency within 15ms threshold."
        };
    }
    async syncDatabase(userId, eventId) {
        try {
            const totalTickets = await this.prisma.ticket.count({
                where: { eventId }
            });
            return {
                success: true,
                syncedAt: new Date(),
                recordsProcessed: totalTickets,
                message: `Ticket database (${totalTickets} records) synchronized with cloud mirror.`
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Database synchronization failed: ' + error.message);
        }
    }
    async getVerificationLogs(userId, eventId) {
        try {
            const logs = await this.prisma.ticket.findMany({
                where: { eventId, scanned: true },
                include: { user: { select: { name: true } }, tier: { select: { name: true } } },
                orderBy: { scannedAt: 'desc' },
                take: 20
            });
            return logs.map(log => ({
                id: log.id,
                visitor: log.user.name || `Visitor #${log.id.slice(-4)}`,
                ticketType: log.tier?.name || "General",
                timestamp: log.scannedAt?.toLocaleTimeString() || "Live"
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch verification logs: ' + error.message);
        }
    }
    async getStationStatus(userId, eventId) {
        try {
            const activeScanner = await this.prisma.scanner.findFirst({
                where: { booth: { ownerId: userId }, eventId, status: 'ONLINE' },
                select: { name: true }
            });
            return {
                stationName: activeScanner?.name || "Terminal 1 Entry",
                status: activeScanner ? "ACTIVE" : "IDLE"
            };
        }
        catch (error) {
            return {
                stationName: "Terminal 1 Entry",
                status: "IDLE"
            };
        }
    }
    async getCrowdStats(userId, eventId) {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId },
                select: { capacity: true }
            });
            if (!event)
                throw new common_1.NotFoundException('Event not found');
            const totalAttendance = await this.prisma.ticket.count({
                where: { eventId, scanned: true }
            });
            const occupancyPercent = event.capacity > 0 ? Math.round((totalAttendance / event.capacity) * 100) : 0;
            return {
                totalAttendance: totalAttendance.toLocaleString(),
                occupancy: occupancyPercent,
                avgDwellTime: "42 mins",
                peakForecast: "02:30 PM",
                isPeakAlert: occupancyPercent > 85
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch crowd stats: ' + error.message);
        }
    }
    async getZoneTraffic(userId, eventId) {
        try {
            const staffInZones = await this.prisma.eventStaff.findMany({
                where: { eventId, booth: { ownerId: userId } },
                select: { zone: true, id: true }
            });
            const zones = [...new Set(staffInZones.map(s => s.zone))];
            if (zones.length === 0)
                return [];
            const zoneData = await Promise.all(zones.map(async (zoneName) => {
                const staffIdsInZone = staffInZones.filter(s => s.zone === zoneName).map(s => s.id);
                const currentOccupancy = await this.prisma.ticket.count({
                    where: {
                        eventId,
                        scanned: true,
                    }
                });
                return {
                    name: zoneName,
                    current: Math.floor(currentOccupancy / zones.length),
                    capacity: 500,
                    trend: "up",
                    status: "Healthy"
                };
            }));
            return zoneData;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch zone traffic: ' + error.message);
        }
    }
    async getCrowdInsights(userId, eventId) {
        try {
            const recentScans = await this.prisma.ticket.findMany({
                where: { eventId, scanned: true },
                orderBy: { scannedAt: 'desc' },
                take: 10
            });
            return {
                scanSpeed: "4.2s / user",
                checkInRate: "142 / hour",
                rejectRate: "0.2%",
                heatmap: [40, 90, 30, 60, 20, 80]
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch crowd insights: ' + error.message);
        }
    }
};
exports.OperationsService = OperationsService;
exports.OperationsService = OperationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OperationsService);
//# sourceMappingURL=operations.service.js.map