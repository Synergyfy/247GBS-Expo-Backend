import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('dashboard/business/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@GetUser('userId') userId: string, @Body() data: CreateProductDto) {
        return this.productService.create(userId, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@GetUser('userId') userId: string) {
        return this.productService.findAll(userId);
    }

    @Get('booth/:boothId')
    findByBooth(@Param('boothId') boothId: string) {
        return this.productService.findByBooth(boothId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@GetUser('userId') userId: string, @Param('id') id: string, @Body() data: UpdateProductDto) {
        return this.productService.update(userId, id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@GetUser('userId') userId: string, @Param('id') id: string) {
        return this.productService.remove(userId, id);
    }
}
