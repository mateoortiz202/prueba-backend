import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>, // El tipo Repository permite el accedo por defecto
                                                                // a funciones como lo son FindOne, FindAll ...
    ) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        const response = await this.productRepository.findOne({where : { id }});

        if (!response) {
            throw new NotFoundException(`Producto con ID ${id} no fue encontrado`)
        }
        else {
            return response
        }
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        // Instancia
        const newProduct = this.productRepository.create(createProductDto);
        // Guarda
        return this.productRepository.save(newProduct)
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product>{
        const find_product = await this.findOne(id);

        const updated = Object.assign(find_product, updateProductDto);

        return this.productRepository.save(updated);
    }

    async remove(id: string): Promise<Product> {
        const find_product = await this.findOne(id);
        return this.productRepository.remove(find_product);
    }


}
