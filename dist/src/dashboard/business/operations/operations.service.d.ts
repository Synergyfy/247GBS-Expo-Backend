import { PrismaService } from '../../../prisma/prisma.service';
import { AssignStaffDto } from './dto/assign-staff.dto';
export declare class OperationsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    getStaff(userId: string, eventId: string): Promise<({
        scanners: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            boothId: string;
            status: string;
            eventId: string;
            deviceId: string;
            battery: string | null;
            assignedStaff: string | null;
            lastSeen: Date;
            staffId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    })[]>;
    assignStaff(userId: string, eventId: string, dto: AssignStaffDto): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    }>;
    updateStaffStatus(userId: string, staffId: string, status: string): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    }>;
    getDiagnostics(userId: string, eventId: string): Promise<{
        label: string;
        val: string;
        status: string;
    }[]>;
    runDiagnostics(userId: string, eventId: string): Promise<{
        success: boolean;
        timestamp: Date;
        results: {
            test: string;
            status: string;
        }[];
        summary: string;
    }>;
    syncDatabase(userId: string, eventId: string): Promise<{
        success: boolean;
        syncedAt: Date;
        recordsProcessed: number;
        message: string;
    }>;
    getVerificationLogs(userId: string, eventId: string): Promise<{
        id: string;
        visitor: string;
        ticketType: string;
        timestamp: string;
    }[]>;
    getStationStatus(userId: string, eventId: string): Promise<{
        stationName: string;
        status: string;
    }>;
    getCrowdStats(userId: string, eventId: string): Promise<{
        totalAttendance: string;
        occupancy: number;
        avgDwellTime: string;
        peakForecast: string;
        isPeakAlert: boolean;
    }>;
    getZoneTraffic(userId: string, eventId: string): Promise<{
        name: string;
        current: number;
        capacity: number;
        trend: string;
        status: string;
    }[]>;
    getCrowdInsights(userId: string, eventId: string): Promise<{
        scanSpeed: string;
        checkInRate: string;
        rejectRate: string;
        heatmap: number[];
    }>;
}
