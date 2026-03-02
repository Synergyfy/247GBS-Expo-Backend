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
exports.BoothService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let BoothService = class BoothService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async setupBooth(ownerId, data) {
        const existingBooth = await this.prisma.booth.findUnique({
            where: { ownerId },
        });
        if (existingBooth) {
            throw new common_1.ConflictException('User already has a booth');
        }
        return this.prisma.booth.create({
            data: {
                ...data,
                ownerId,
            },
        });
    }
    async updateBooth(ownerId, data) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId },
        });
        if (!booth) {
            throw new common_1.NotFoundException('Booth not found');
        }
        return this.prisma.booth.update({
            where: { ownerId },
            data,
        });
    }
    async getMyBooth(ownerId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId },
            include: {
                products: true,
            },
        });
        if (!booth) {
            throw new common_1.NotFoundException('Booth not found');
        }
        return booth;
    }
    async getBoothById(id) {
        const booth = await this.prisma.booth.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
        if (!booth) {
            throw new common_1.NotFoundException('Booth not found');
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
    async getDashboardStats(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId },
            include: { products: true },
        });
        if (!booth) {
            throw new common_1.NotFoundException('Booth not found');
        }
        const [orders, visitors, appointments] = await Promise.all([
            this.prisma.order.findMany({ where: { boothId: booth.id, status: 'PICKED_UP' } }),
            this.prisma.channelVisit.count({ where: { eventId: { not: '' } } }),
            this.prisma.appointment.count({ where: { boothId: booth.id } }),
        ]);
        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
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
};
exports.BoothService = BoothService;
exports.BoothService = BoothService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoothService);
//# sourceMappingURL=booth.service.js.map