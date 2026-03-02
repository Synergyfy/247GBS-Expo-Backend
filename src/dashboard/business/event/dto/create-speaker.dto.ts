import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateSpeakerDto {
    @ApiProperty({ example: 'Dr. Sarah Smith' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'CEO, TechGlobal' })
    @IsString()
    role: string;

    @ApiProperty({ required: false, example: 'Innovation 2026' })
    @IsOptional()
    @IsString()
    topic?: string;
}
