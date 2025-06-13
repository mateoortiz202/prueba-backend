import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}

    // Obtener todos los productos
    @Get()
    findAll(): Promise<Product[]>{
        return this.productsService.findAll();
    }

    // Obtener un producto por id
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product>{
        return this.productsService.findOne(id);
    }

    // TODO: hacer un endpoint que traiga por nombre

    // Crear un producto
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    // Actualizar un producto
    @Put(':id')
    updateOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() product: UpdateProductDto): Promise<Product>{
        return this.productsService.update(id, product);
    }

    // Eliminar un producto
    @Delete(':id')
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product> {
        return this.productsService.remove(id);
        
    }
}
