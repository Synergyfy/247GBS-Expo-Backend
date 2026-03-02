import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class AllocateTicketsDto {
    @IsArray()
    @IsEmail({}, { each: true })
    emails: string[];

    @IsString()
    @IsOptional()
    campaignId?: string;
}
