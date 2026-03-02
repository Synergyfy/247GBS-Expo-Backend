import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { SalesChannel } from '../enums/sales-channel.enum';

export class TrackVisitDto {
    @ApiProperty({ enum: SalesChannel })
    @IsEnum(SalesChannel)
    channel: SalesChannel;

    @ApiProperty()
    @IsString()
    eventId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    ip?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    userAgent?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deviceType?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    assetCode?: string;
}
