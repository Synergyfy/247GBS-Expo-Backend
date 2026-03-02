import { ProductCategory, ProductStatus } from '@prisma/client';
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    image?: string;
    category?: ProductCategory;
    sku?: string;
    stock?: number;
    status?: ProductStatus;
}
