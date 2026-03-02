import { EventStatus } from '@prisma/client';
export declare class GetEventsQueryDto {
    status?: EventStatus;
    sortBy?: 'startDate' | 'createdAt' | 'sales' | 'revenue';
    sortOrder?: 'asc' | 'desc';
    search?: string;
}
