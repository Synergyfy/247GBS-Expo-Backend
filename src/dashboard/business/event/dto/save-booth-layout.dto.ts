import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class SaveBoothLayoutDto {
    @ApiProperty({ description: 'Booth layout configuration as JSON' })
    @IsObject()
    layout: any;
}
