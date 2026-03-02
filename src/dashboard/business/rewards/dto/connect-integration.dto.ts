import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class ConnectIntegrationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsObject()
    @IsOptional()
    config?: any;
}
