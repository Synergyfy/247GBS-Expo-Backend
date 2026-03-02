import { CreateTicketTierDto } from '../../dashboard/business/event/dto/create-ticket-tier.dto';
export declare class CreateEventDto {
    name: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'COMPLETED';
    description?: string;
    startDate: string;
    endDate: string;
    location?: string;
    eventType?: string;
    category: string;
    type: string;
    format?: string;
    tickets?: CreateTicketTierDto[];
    organizer: string;
    fullImage?: string;
    videoUrl?: string;
    benefits: string[];
    rating?: number;
    reviews?: number;
}
