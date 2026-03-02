import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateCampaignDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

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

    @ApiProperty({ enum: ['PROMO', 'FLASH', 'BUNDLE', 'GEO'] })
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty({ enum: ['PERCENTAGE', 'FIXED', 'BOGO'] })
    @IsString()
    @IsOptional()
    discountType?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    discountValue?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    targetTierId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    code?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;
}
