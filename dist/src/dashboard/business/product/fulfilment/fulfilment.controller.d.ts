import { FulfilmentService } from './fulfilment.service';
import { CreateFulfilmentPointDto, UpdateFulfilmentPointDto } from './dto/fulfilment-point.dto';
import { UpdateFulfilmentSlotDto } from './dto/fulfilment-slot.dto';
export declare class FulfilmentController {
    private readonly fulfilmentService;
    constructor(fulfilmentService: FulfilmentService);
    getStats(userId: string): Promise<{
        pendingShipments: number;
        pickupReady: number;
        serviceSlots: string;
        inventoryAlerts: number;
    }>;
    getInventory(userId: string): Promise<{
        id: string;
        name: string;
        sku: string;
        allocated: number;
        stock: number;
        status: string;
    }[]>;
    getPoints(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        boothId: string;
        active: boolean;
    }[]>;
    createPoint(userId: string, data: CreateFulfilmentPointDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        boothId: string;
        active: boolean;
    }>;
    updatePoint(userId: string, id: string, data: UpdateFulfilmentPointDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        boothId: string;
        active: boolean;
    }>;
    getSlots(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        booked: number;
    }[]>;
    updateSlot(userId: string, id: string, data: UpdateFulfilmentSlotDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        booked: number;
    }>;
    getExceptions(userId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.ExceptionType;
        boothId: string;
        resolved: boolean;
    }[]>;
    resolveException(userId: string, id: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.ExceptionType;
        boothId: string;
        resolved: boolean;
    }>;
    notifyCustomers(userId: string, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    handleSubstitution(userId: string, productId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
