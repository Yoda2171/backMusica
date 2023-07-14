import { IsString, IsPositive, IsNotEmpty } from 'class-validator';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';


export class CreateCartDto {
    @IsNotEmpty()
    @IsString()
    createdAt: string;

    @IsNotEmpty()
    @IsPositive()
    totalPrice: number;

    @IsNotEmpty()
    @IsPositive()
    userId: Auth;

    @IsNotEmpty()
    @IsPositive()
    products: Product[];
}
