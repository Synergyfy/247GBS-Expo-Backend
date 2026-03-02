import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsArray, IsInt, IsNumber } from 'class-validator';
import { CreateTicketTierDto } from '../../dashboard/business/event/dto/create-ticket-tier.dto';

export class CreateEventDto {
    @ApiProperty()
    @IsString()
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false, enum: ['DRAFT', 'PUBLISHED', 'COMPLETED'] })
    @IsOptional()
    @IsString()
    status?: 'DRAFT' | 'PUBLISHED' | 'COMPLETED';

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsDateString()
    endDate: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ example: 'expo', description: 'Template type: expo, workshop, webinar, panel' })
    @IsOptional()
    @IsString()
    eventType?: string;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty({ required: false, example: 'virtual' })
    @IsOptional()
    @IsString()
    format?: string;

    @ApiProperty({ type: [CreateTicketTierDto] })
    @IsOptional()
    @IsArray()
    tickets?: CreateTicketTierDto[];

    @ApiProperty()
    @IsString()
    organizer: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    fullImage?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    videoUrl?: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    benefits: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    rating?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    reviews?: number;
}
