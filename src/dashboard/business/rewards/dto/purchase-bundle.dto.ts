import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PurchaseBundleDto {
    @IsString()
    @IsNotEmpty()
    bundleId: string;

    @IsNumber()
    @IsNotEmpty()
    qty: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
