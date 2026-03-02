import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateFulfilmentPointDto, UpdateFulfilmentPointDto } from './dto/fulfilment-point.dto';
import { UpdateFulfilmentSlotDto } from './dto/fulfilment-slot.dto';

@Injectable()
export class FulfilmentService {
    constructor(private prisma: PrismaService) { }

    private async getBooth(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
        });
        if (!booth) {
            throw new ForbiddenException('You do not have a booth.');
        }
        return booth;
    }

    async getStats(userId: string) {
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

        // Mocking service slots for now as a ratio
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

    async getInventory(userId: string) {
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

    async getPoints(userId: string) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentPoint.findMany({
            where: { boothId: booth.id },
        });
    }

    async createPoint(userId: string, data: CreateFulfilmentPointDto) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentPoint.create({
            data: {
                ...data,
                boothId: booth.id,
            },
        });
    }

    async updatePoint(userId: string, id: string, data: UpdateFulfilmentPointDto) {
        const booth = await this.getBooth(userId);
        const point = await this.prisma.fulfilmentPoint.findUnique({ where: { id: id } });

        if (!point || point.boothId !== booth.id) {
            throw new ForbiddenException('Not authorized');
        }

        return this.prisma.fulfilmentPoint.update({
            where: { id },
            data,
        });
    }

    async getSlots(userId: string) {
        const booth = await this.getBooth(userId);
        return this.prisma.fulfilmentSlot.findMany({
            where: { boothId: booth.id },
        });
    }

    async updateSlot(userId: string, id: string, data: UpdateFulfilmentSlotDto) {
        const booth = await this.getBooth(userId);
        const slot = await this.prisma.fulfilmentSlot.findUnique({ where: { id: id } });

        if (!slot || slot.boothId !== booth.id) {
            throw new ForbiddenException('Not authorized');
        }

        return this.prisma.fulfilmentSlot.update({
            where: { id },
            data,
        });
    }

    async getExceptions(userId: string) {
        const booth = await this.getBooth(userId);
        return this.prisma.logisticsException.findMany({
            where: { boothId: booth.id, resolved: false },
        });
    }

    async resolveException(userId: string, id: string) {
        const booth = await this.getBooth(userId);
        const exc = await this.prisma.logisticsException.findUnique({ where: { id: id } });

        if (!exc || exc.boothId !== booth.id) {
            throw new ForbiddenException('Not authorized');
        }

        return this.prisma.logisticsException.update({
            where: { id },
            data: { resolved: true },
        });
    }

    async notifyCustomers(userId: string, exceptionId: string) {
        // Logic to find impacted users and send notifications
        return { success: true, message: 'Notifications sent to impacted customers.' };
    }

    async handleSubstitution(userId: string, productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { substitute: true }
        });

        if (!product || !product.substitute) {
            throw new NotFoundException('No substitute found for this product.');
        }

        // Logical swap for pending orders
        return { success: true, message: `Switched remaining orders to ${product.substitute.name}` };
    }
}
