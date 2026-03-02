import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateSessionDto {
    @ApiProperty({ example: 'Opening Keynote' })
    @IsString()
    title: string;

    @ApiProperty({ example: '09:00 AM' })
    @IsString()
    time: string;

    @ApiProperty({ example: 'Main Stage' })
    @IsString()
    hall: string;

    @ApiProperty({ required: false, description: 'Speaker ID' })
    @IsOptional()
    @IsString()
    speakerId?: string;
}
