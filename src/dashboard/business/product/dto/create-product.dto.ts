import { IsString, IsOptional, IsNumber, IsUrl, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory, ProductStatus } from '@prisma/client';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    image?: string;

    @ApiProperty({ enum: ProductCategory, required: false })
    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @ApiProperty({ enum: ProductStatus, required: false })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;
}
