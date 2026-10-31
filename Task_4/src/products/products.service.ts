import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
