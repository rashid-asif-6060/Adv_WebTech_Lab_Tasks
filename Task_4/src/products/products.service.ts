import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const newProduct = this.productsRepo.create(dto);
    const product = await this.productsRepo.save(newProduct);
    return { message: 'Product created successfully', data: product };
  }

  async findAll() {
    const data = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Products fetched successfully',
      count: data.length,
      data,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return { message: 'Product fetched successfully', data: product };
  }

  async findByCategory(category: string) {
    const data = await this.productsRepo.find({ where: { category } });
    return {
      message: 'Products fetched by category successfully',
      count: data.length,
      data,
    };
  }

  async search(keyword: string) {
    const data = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return {
      message: 'Search results fetched successfully',
      count: data.length,
      data,
    };
  }
}
