export declare class CreateTicketTierDto {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    type?: string;
    saleStart?: string;
    saleEnd?: string;
    transferable?: boolean;
    refundable?: boolean;
    rules?: string;
    accessZones?: string[];
    productIds?: string[];
    eventCapacity?: number;
}
