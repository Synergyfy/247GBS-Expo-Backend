import { IsString, IsOptional, IsEmail, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

class BoothProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    website?: string;
}

export class UpdateProfileDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UserProfileDto)
    user?: UserProfileDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => BoothProfileDto)
    booth?: BoothProfileDto;
}
