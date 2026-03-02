import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class GetEventsQueryDto {
    @IsOptional()
    @IsEnum(EventStatus)
    status?: EventStatus;

    @IsOptional()
    @IsString()
    sortBy?: 'startDate' | 'createdAt' | 'sales' | 'revenue';

    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';

    @IsOptional()
    @IsString()
    search?: string;
}
