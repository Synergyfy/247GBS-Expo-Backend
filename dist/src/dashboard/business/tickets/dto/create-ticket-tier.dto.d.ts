import { TicketType } from '../enums/ticket-type.enum';
export declare class CreateTicketTierDto {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    type?: TicketType;
    saleStart?: string;
    saleEnd?: string;
    transferable?: boolean;
    refundable?: boolean;
    rules?: string;
    accessZones?: string[];
    productIds?: string[];
    eventCapacity?: number;
    status?: string;
    stockTracking?: boolean;
    autoLock?: boolean;
    waitlist?: boolean;
}
