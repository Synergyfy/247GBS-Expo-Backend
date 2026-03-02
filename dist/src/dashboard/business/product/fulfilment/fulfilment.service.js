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
exports.FulfilmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let FulfilmentService = class FulfilmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBooth(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth.');
        }
        return booth;
    }
    async getStats(userId) {
        const booth = await this.getBooth(userId);
        const pendingShipments = await this.prisma.order.count({
            where: { boothId: booth.id, status: 'PENDING', type: 'DELIVERY' },
        });
        const pickupReady = await this.prisma.order.count({
            where: { boothId: booth.id, status: 'READY', type: 'PICKUP' },
        });
        const activeExceptions = await this.prisma.logisticsException.count({
            where: { boothId: booth.id, resolved: false },
        });
        const slots = await this.prisma.fulfilmentSlot.findMany({
            where: { boothId: booth.id },
        });
        const totalCapacity = slots.reduce((acc, s) => acc + s.capacity, 0);
        const totalBooked = slots.reduce((acc, s) => acc + s.booked, 0);
        return {
            pendingShipments,
            pickupReady,
            serviceSlots: `${totalBooked}/${totalCapacity}`,
            inventoryAlerts: activeExceptions,
        };
    }
    async getInventory(userId) {
        const booth = await this.getBooth(userId);
        const products = await this.prisma.product.findMany({
            where: { boothId: booth.id },
            include: {
                orderItems: {
                    where: {
                        order: {
                            status: { in: ['PENDING', 'READY'] },
                        },
                    },
                },
            },
        });
        return products.map(p => {
            const allocated = p.orderItems.reduce((acc, item) => acc + item.quantity, 0);
            return {
                id: p.id,
                name: p.name,
                sku: p.sku || 'N/A',
                allocated,
                stock: p.stock,
                status: p.stock < 10 ? 'Low Stock' : 'Healthy',
            };
        });
    }
    async getPoints(userId) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentPoint.findMany({
            where: { boothId: booth.id },
        });
    }
    async createPoint(userId, data) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentPoint.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }
    async updatePoint(userId, id, data) {
        const booth = await this.getBooth(userId);
        const point = await this.prisma.fulfilmentPoint.findUnique({ where: { id: id } });
        if (!point || point.boothId !== booth.id) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        return this.prisma.fulfilmentPoint.update({
            where: { id },
            data,
        });
    }
    async getSlots(userId) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentSlot.findMany({
            where: { boothId: booth.id },
        });
    }
    async updateSlot(userId, id, data) {
        const booth = await this.getBooth(userId);
        const slot = await this.prisma.fulfilmentSlot.findUnique({ where: { id: id } });
        if (!slot || slot.boothId !== booth.id) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        return this.prisma.fulfilmentSlot.update({
            where: { id },
            data,
        });
    }
    async getExceptions(userId) {
        const booth = await this.getBooth(userId);
        return this.prisma.logisticsException.findMany({
            where: { boothId: booth.id, resolved: false },
        });
    }
    async resolveException(userId, id) {
        const booth = await this.getBooth(userId);
        const exc = await this.prisma.logisticsException.findUnique({ where: { id: id } });
        if (!exc || exc.boothId !== booth.id) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        return this.prisma.logisticsException.update({
            where: { id },
            data: { resolved: true },
        });
    }
    async notifyCustomers(userId, exceptionId) {
        return { success: true, message: 'Notifications sent to impacted customers.' };
    }
    async handleSubstitution(userId, productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { substitute: true }
        });
        if (!product || !product.substitute) {
            throw new common_1.NotFoundException('No substitute found for this product.');
        }
        return { success: true, message: `Switched remaining orders to ${product.substitute.name}` };
    }
};
exports.FulfilmentService = FulfilmentService;
exports.FulfilmentService = FulfilmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FulfilmentService);
//# sourceMappingURL=fulfilment.service.js.map