import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class AssignStaffDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    zone: string;

    @IsEnum(['ACTIVE', 'BREAK', 'OFFLINE'])
    status: string;
}
