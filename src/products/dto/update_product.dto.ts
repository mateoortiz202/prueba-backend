import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { CreateProductDto } from "./create_product.dto";
import { PartialType } from "@nestjs/mapped-types";
// Debemos de instalar mapped-types

// Simplemente podría volver a utilizar el dto de create, para exigir que mande todos los campos del producto
// y así ahorrar codigo, sin embargo quisiera agregar la opción para que se pueda mandar cualquier campo, sin ninguno obligatorio
// por si solo quieres actualizar parte de la información. Esto también con el objetivo de que el usuario no tenga que recordar todos los
// demas valores para asi poder dejarlos iguales, sino que solo agregue la información que se necesite cambiar

export class UpdateProductDto extends PartialType(CreateProductDto) {}