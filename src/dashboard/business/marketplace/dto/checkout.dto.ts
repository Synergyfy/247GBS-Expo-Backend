import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckoutDto {
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsString()
    @IsNotEmpty()
    type: string; // e.g., 'GENERAL', 'VIP'

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
