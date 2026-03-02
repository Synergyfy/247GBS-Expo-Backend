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
exports.RedemptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RedemptionService = class RedemptionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: {
                products: true
            }
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth.');
        }
        const totalRedeemed = await this.prisma.order.count({
            where: {
                boothId: booth.id,
                status: 'PICKED_UP'
            }
        });
        const totalPending = await this.prisma.order.count({
            where: {
                boothId: booth.id,
                status: { in: ['PENDING', 'READY'] }
            }
        });
        return {
            redeemed: totalRedeemed,
            total: totalRedeemed + totalPending,
            queueTime: "~2m",
            activeStaff: 1
        };
    }
    async getHistory(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth.');
        }
        return this.prisma.order.findMany({
            where: {
                boothId: booth.id,
                status: 'PICKED_UP'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: { updatedAt: 'desc' },
            take: 10
        });
    }
    async findOrdersByVisitor(userId, identifier) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth.');
        }
        let visitorId = identifier;
        const visitor = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { id: identifier },
                    { qrCode: identifier },
                ],
            },
        });
        if (!visitor) {
            const order = await this.prisma.order.findUnique({
                where: { id: identifier },
                select: { userId: true },
            });
            if (order) {
                visitorId = order.userId;
            }
            else {
                throw new common_1.NotFoundException('Visitor or Order not found with this identifier.');
            }
        }
        else {
            visitorId = visitor.id;
        }
        return this.prisma.order.findMany({
            where: {
                userId: visitorId,
                boothId: booth.id,
                status: { in: ['PENDING', 'READY'] },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async redeemOrder(userId, orderId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new common_1.ForbiddenException('You do not have a booth.');
        }
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.boothId !== booth.id) {
            throw new common_1.ForbiddenException('This order does not belong to your booth');
        }
        if (order.status === 'PICKED_UP') {
            throw new common_1.ConflictException('This order has already been redeemed.');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PICKED_UP' },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
};
exports.RedemptionService = RedemptionService;
exports.RedemptionService = RedemptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RedemptionService);
//# sourceMappingURL=redemption.service.js.map