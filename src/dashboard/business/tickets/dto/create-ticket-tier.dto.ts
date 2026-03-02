import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsInt, Min, IsArray, IsBoolean, IsEnum } from 'class-validator';
import { TicketType } from '../enums/ticket-type.enum';

export class CreateTicketTierDto {
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

    @ApiProperty()
    @IsInt()
    @Min(0)
    quantity: number;

    @ApiProperty({ required: false, enum: TicketType, default: TicketType.GENERAL })
    @IsOptional()
    @IsEnum(TicketType)
    type?: TicketType;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    saleStart?: string; // Expecting ISO date string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    saleEnd?: string; // Expecting ISO date string

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    transferable?: boolean;

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    refundable?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    rules?: string;

    @ApiProperty({ required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    accessZones?: string[];

    @ApiProperty({ required: false, type: [String], description: 'Product IDs to bundle with this ticket tier' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    productIds?: string[];

    @ApiProperty({ required: false, description: 'Update the global event capacity' })
    @IsOptional()
    @IsInt()
    @Min(0)
    eventCapacity?: number;

    @ApiProperty({ required: false, default: 'Active' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    stockTracking?: boolean;

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    autoLock?: boolean;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    waitlist?: boolean;
}
