import { IsOptional, IsString } from 'class-validator';

export class GetMarketplaceEventsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    type?: string;
}
