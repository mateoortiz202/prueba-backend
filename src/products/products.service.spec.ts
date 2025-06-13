import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update_product.dto';

// Para simular las funciones de Repository
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn()
});

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: MockRepo<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(Product));
  });

  it('should return all products', async () => {
    const expected = [{
      id: "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1", 
      name: "Chocolate",
      price: 50,
      stock:10
    }];

    // Sabemos que la función find si se está generando, entonces obviamos la advertencia con !
    // simulamos una pequeña base de datos con el mockResolvedValue
    repository.find!.mockResolvedValue(expected);
    const result = await service.findAll();
    expect(result).toEqual(expected)
  });

  it('should return a product by ID', async () => {
    const product = {
      id: "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1", 
      name: "Palo de queso",
      price: 1.50,
      stock: 30
    }
    repository.findOne!.mockResolvedValue(product);

    const result = await service.findOne("9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1");
    expect(result).toEqual(product);
  });

  it('should throw if product not found', async () => {
    repository.findOne!.mockResolvedValue(undefined);

    await expect(service.findOne("9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1")).rejects.toThrow(NotFoundException);
  });

  it('should create and return a new product', async () => {
    const dto = {name: "Teclado", price: 200, stock: 50};
    const product_saved = {id: "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1", ...dto};

    repository.create!.mockReturnValue(dto);
    repository.save!.mockResolvedValue(product_saved);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(product_saved);
  });

  it('should update info from a product and return product', async () => {
    const id = "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1";
    
    const dto: UpdateProductDto = {
      name: "Palo de queso actualizado",
      price: 9876,
      stock: 25
    }
    const originalProduct = {
      id, 
      name: "Palo de queso",
      price: 1.50,
      stock: 30
    }
    const updatedProduct = {...originalProduct, ...dto}

    repository.findOne!.mockResolvedValue(originalProduct);
    repository.save!.mockResolvedValue(updatedProduct);

    const result = await service.update(id, dto);

    expect(repository.findOne).toHaveBeenCalledWith({"where": {"id": id}});
    expect(repository.save).toHaveBeenCalledWith(originalProduct);

    expect(result).toEqual(updatedProduct)
  })

  it('should throw NotFoundException if the product is not found', async () => {
    const id = "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1";
    
    const dto: UpdateProductDto = {
      name: "Palo de queso actualizado",
      price: 9876,
      stock: 25
    }
    repository.findOne!.mockResolvedValue(null);

    // const result = service.update(id, dto);

    await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);

  });

  it('should delete and return the product deleted', async () => {
    const id = "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1";
    
    const product = {
      id,
      name: "Palo de queso actualizado",
      price: 9876,
      stock: 25
    }
    repository.findOne!.mockResolvedValue(product);
    repository.remove!.mockResolvedValue(product);

    const result = await service.remove("9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1");

    expect(repository.findOne).toHaveBeenCalledWith({"where": {"id": "9a2f5b22-6f3e-4b29-ae9e-2d77d64cfbd1"}});
    expect(repository.remove).toHaveBeenCalledWith(product);

    expect(result).toEqual(product)
  });

  
});
