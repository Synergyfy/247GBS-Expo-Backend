import { SalesAssetType } from '@prisma/client';
export declare class CreateSalesAssetDto {
    name: string;
    type: SalesAssetType;
    tierId?: string;
    customCode?: string;
}
