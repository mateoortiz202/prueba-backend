import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
// instalar class-validator para validar la data y class-transformer para la data que entra a modo de json

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber() 
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

}