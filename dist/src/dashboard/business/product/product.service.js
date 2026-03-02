"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth. Please create one first.');
        }
        return this.prisma.product.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }
    async findAll(userId) {
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
    async findByBooth(boothId) {
        return this.prisma.product.findMany({
            where: { boothId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { booth: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async update(userId, id, data) {
        const product = await this.findOne(id);
        if (product.booth.ownerId !== userId) {
            throw new common_1.ForbiddenException('You do not own this product');
        }
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async remove(userId, id) {
        const product = await this.findOne(id);
        if (product.booth.ownerId !== userId) {
            throw new common_1.ForbiddenException('You do not own this product');
        }
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map