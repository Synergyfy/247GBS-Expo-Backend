import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFulfilmentPointDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;
}

export class UpdateFulfilmentPointDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
