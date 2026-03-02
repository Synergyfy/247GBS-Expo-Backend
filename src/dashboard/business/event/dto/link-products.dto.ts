import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class LinkProductsDto {
    @ApiProperty({ type: [String], description: 'Array of product IDs to link to the event' })
    @IsArray()
    @IsString({ each: true })
    productIds: string[];
}
