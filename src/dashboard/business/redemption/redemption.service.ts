import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RedemptionService {
    constructor(private prisma: PrismaService) { }

    async findOrdersByVisitor(userId: string, identifier: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });

        if (!booth) {
            throw new ForbiddenException('You do not have a booth.');
        }

        // 1. Try to find the visitor (User)
        let visitorId = identifier;

        // check if identifier is a QR code or User ID
        const visitor = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { id: identifier },
                    { qrCode: identifier },
                ],
            },
        });

        if (!visitor) {
            // 2. If no user found, try to find by Order ID to identify the visitor
            const order = await this.prisma.order.findUnique({
                where: { id: identifier },
                select: { userId: true },
            });
            if (order) {
                visitorId = order.userId;
            } else {
                throw new NotFoundException('Visitor or Order not found with this identifier.');
            }
        } else {
            visitorId = visitor.id;
        }

        // 3. Return all redeemable orders for this visitor at this booth
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

    async redeemOrder(userId: string, orderId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });

        if (!booth) {
            throw new ForbiddenException('You do not have a booth.');
        }

        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (order.boothId !== booth.id) {
            throw new ForbiddenException('This order does not belong to your booth');
        }

        if (order.status === 'PICKED_UP') {
            throw new ConflictException('This order has already been redeemed.');
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
}
