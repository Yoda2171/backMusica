import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto { 
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    marca: string;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsNotEmpty()
    categoria: string;
}
