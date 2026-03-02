import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: CreateProductDto) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });

        if (!booth) {
            throw new ForbiddenException('You do not have a booth. Please create one first.');
        }

        return this.prisma.product.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }

    async findAll(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });

        if (!booth) {
            return [];
        }

        return this.prisma.product.findMany({
            where: { boothId: booth.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByBooth(boothId: string) {
        return this.prisma.product.findMany({
            where: { boothId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { booth: true },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async update(userId: string, id: string, data: UpdateProductDto) {
        const product = await this.findOne(id);

        if (product.booth.ownerId !== userId) {
            throw new ForbiddenException('You do not own this product');
        }

        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    async remove(userId: string, id: string) {
        const product = await this.findOne(id);

        if (product.booth.ownerId !== userId) {
            throw new ForbiddenException('You do not own this product');
        }

        return this.prisma.product.delete({
            where: { id },
        });
    }
}
