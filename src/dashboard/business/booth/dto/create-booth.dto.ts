import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoothDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    logo?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    banner?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    contactName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    contactTitle?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    publicEmail?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phoneDisplay?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    tagline?: string;
}
