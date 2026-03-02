import { PrismaService } from '../../../prisma/prisma.service';
import { PairScannerDto } from './dto/pair-scanner.dto';
export declare class POSService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    getDevices(userId: string, eventId: string): Promise<{
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
    }[]>;
    pairDevice(userId: string, eventId: string, dto: PairScannerDto): Promise<{
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
    }>;
    getAttendanceStats(userId: string, eventId: string): Promise<{
        occupancy: {
            scanned: number;
            total: number;
            percentage: number;
            label: string;
        };
        status: string;
        insight: string;
    }>;
    checkInTicket(userId: string, eventId: string, ticketId: string, deviceId: string): Promise<{
        status: string;
        user: string;
        ticketType: string;
        id: string;
        timestamp: string;
        avatar: string;
    }>;
}
