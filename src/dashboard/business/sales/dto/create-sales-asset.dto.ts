import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SalesAssetType } from '@prisma/client';

export class CreateSalesAssetDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Internal Label

    @IsEnum(SalesAssetType)
    @IsNotEmpty()
    type: SalesAssetType;

    @IsString()
    @IsOptional()
    tierId?: string; // Target Event / Tier

    @IsString()
    @IsOptional()
    customCode?: string; // Optional custom slug
}
