import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

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

  // PATCH - partial update
  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    await this.productsRepo.update(id, dto);
    const updated = await this.productsRepo.findOne({ where: { id } });
    return { message: 'Product updated successfully', data: updated };
  }

  // PUT - full replace
  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    Object.assign(product, dto);
    await this.productsRepo.save(product);
    const updated = await this.productsRepo.findOne({ where: { id } });
    return { message: 'Product replaced successfully', data: updated };
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    await this.productsRepo.delete(id);
    return { message: 'Product deleted successfully', id };
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

  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    product.isActive = !product.isActive;
    await this.productsRepo.save(product);
    return { message: 'Product status toggled successfully', data: product };
  }
}
