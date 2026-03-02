import { POSService } from './pos.service';
import { PairScannerDto } from './dto/pair-scanner.dto';
export declare class POSController {
    private readonly posService;
    constructor(posService: POSService);
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
}
