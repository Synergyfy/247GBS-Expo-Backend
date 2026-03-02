import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PairScannerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    battery?: string;

    @IsOptional()
    @IsString()
    assignedStaff?: string;
}
