import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBoothDto } from './dto/create-booth.dto';
import { UpdateBoothDto } from './dto/update-booth.dto';

@Injectable()
export class BoothService {
    constructor(private prisma: PrismaService) { }

    async setupBooth(ownerId: string, data: CreateBoothDto) {
        const existingBooth = await this.prisma.booth.findUnique({
            where: { ownerId },
        });

        if (existingBooth) {
            throw new ConflictException('User already has a booth');
        }

        return this.prisma.booth.create({
            data: {
                ...data,
                ownerId,
            },
        });
    }

    async updateBooth(ownerId: string, data: UpdateBoothDto) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId },
        });

        if (!booth) {
            throw new NotFoundException('Booth not found');
        }

        return this.prisma.booth.update({
            where: { ownerId },
            data,
        });
    }

    async getMyBooth(ownerId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId },
            include: {
                products: true,
            },
        });

        if (!booth) {
            throw new NotFoundException('Booth not found');
        }

        return booth;
    }

    async getBoothById(id: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });

        if (!booth) {
            throw new NotFoundException('Booth not found');
        }

        return booth;
    }

    async getAllBooths() {
        return this.prisma.booth.findMany({
            include: {
                owner: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async getDashboardStats(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: { products: true },
        });

        if (!booth) {
            throw new NotFoundException('Booth not found');
        }

        const [orders, visitors, appointments] = await Promise.all([
            this.prisma.order.findMany({ where: { boothId: booth.id, status: 'PICKED_UP' } }),
            this.prisma.channelVisit.count({ where: { eventId: { not: '' } } }), // Placeholder for booth visits
            this.prisma.appointment.count({ where: { boothId: booth.id } }),
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

        // Calculate Booth Completion
        const completionTasks = [
            { id: 'logo', completed: !!booth.logo },
            { id: 'banner', completed: !!booth.banner },
            { id: 'description', completed: !!booth.description },
            { id: 'products', completed: booth.products.length >= 3 },
            { id: 'location', completed: !!booth.location },
        ];

        const completedCount = completionTasks.filter(t => t.completed).length;
        const completionPct = Math.round((completedCount / completionTasks.length) * 100);

        return {
            stats: [
                { label: "Total Views", val: visitors > 0 ? `${(visitors / 1000).toFixed(1)}K` : "0", trend: "+0%", isUp: true },
                { label: "Active Leads", val: appointments.toString(), trend: "+5%", isUp: true },
                { label: "Product Sales", val: `£${totalRevenue.toLocaleString()}`, trend: "+8.2%", isUp: true },
                { label: "Avg. Duration", val: "4m 12s", trend: "+2%", isUp: true }
            ],
            completion: {
                percentage: completionPct,
                tasks: [
                    { label: "Upload Business Logo & Banner", completed: !!booth.logo && !!booth.banner },
                    { label: "Add at least 3 products", completed: booth.products.length >= 3 },
                    { label: "Configure Business Description", completed: !!booth.description },
                    { label: "Set Business Location", completed: !!booth.location }
                ]
            },
            schedule: [
                { time: "10:00 AM", title: "Product Launch Q&A", status: "Coming Soon" },
                { time: "02:30 PM", title: "Live Showcase", status: "Scheduled" }
            ]
        };
    }
}
