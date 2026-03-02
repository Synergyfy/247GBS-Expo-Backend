import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFulfilmentSlotDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    capacity?: number;
}
