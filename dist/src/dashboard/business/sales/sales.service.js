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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const sales_channel_enum_1 = require("./enums/sales-channel.enum");
let SalesService = class SalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesStats(userId, eventId) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required for performance analytics');
        await this.verifyEventOwner(userId, eventId);
        try {
            const orders = await this.prisma.order.findMany({
                where: { eventId, status: 'PICKED_UP' },
                select: { totalAmount: true }
            });
            const channelRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
            const totalVisitors = await this.prisma.channelVisit.count({
                where: { eventId }
            });
            const totalSuccessfulOrders = await this.prisma.order.count({
                where: { eventId, status: 'PICKED_UP' }
            });
            const conversionRate = totalVisitors > 0 ? (totalSuccessfulOrders / totalVisitors) * 100 : 0;
            const channelVisitCount = await this.prisma.channelVisit.count({
                where: { eventId, NOT: { channel: 'MARKETPLACE' } }
            });
            const directTrafficPercent = totalVisitors > 0 ? ((totalVisitors - channelVisitCount) / totalVisitors) * 100 : 0;
            return {
                channelRevenue,
                directTraffic: `${directTrafficPercent.toFixed(1)}%`,
                conversionRate: `${conversionRate.toFixed(1)}%`,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to fetch sales statistics: ${error.message}`);
        }
    }
    async getChannelsData(userId, eventId) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required to fetch channel data');
        await this.verifyEventOwner(userId, eventId);
        try {
            const channels = Object.values(sales_channel_enum_1.SalesChannel);
            const channelData = await Promise.all(channels.map(async (channel) => {
                const sales = await this.prisma.order.findMany({
                    where: { eventId, channel: channel, status: 'PICKED_UP' },
                    select: { totalAmount: true }
                });
                const revenue = sales.reduce((sum, s) => sum + Number(s.totalAmount), 0);
                const visitors = await this.prisma.channelVisit.count({
                    where: { eventId, channel: channel }
                });
                return {
                    id: channel.toLowerCase(),
                    name: this.getChannelName(channel),
                    status: 'Active',
                    sales: `£${revenue.toLocaleString()}`,
                    visitors: visitors >= 1000 ? `${(visitors / 1000).toFixed(1)}k` : visitors.toString(),
                };
            }));
            return channelData;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to retrieve channel revenue data: ${error.message}`);
        }
    }
    async getChannelPerformance(userId, eventId, channel) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required for performance deep-dive');
        if (!channel)
            throw new common_1.BadRequestException('Channel name must be specified');
        await this.verifyEventOwner(userId, eventId);
        try {
            const upperChannel = channel.toUpperCase();
            const days = 7;
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            const [orders, visits] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        eventId,
                        channel: upperChannel,
                        status: 'PICKED_UP',
                        createdAt: { gte: startDate }
                    }
                }),
                this.prisma.channelVisit.findMany({
                    where: {
                        eventId,
                        channel: upperChannel,
                        createdAt: { gte: startDate }
                    }
                })
            ]);
            const timeSeriesMap = new Map();
            for (let i = 0; i < days; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                timeSeriesMap.set(dateStr, { date: dateStr, sales: 0, revenue: 0, visitors: 0 });
            }
            orders.forEach(o => {
                const dateStr = o.createdAt.toISOString().split('T')[0];
                if (timeSeriesMap.has(dateStr)) {
                    const entry = timeSeriesMap.get(dateStr);
                    entry.sales++;
                    entry.revenue += Number(o.totalAmount);
                }
            });
            visits.forEach(v => {
                const dateStr = v.createdAt.toISOString().split('T')[0];
                if (timeSeriesMap.has(dateStr)) {
                    timeSeriesMap.get(dateStr).visitors++;
                }
            });
            const deviceStats = { mobile: 0, desktop: 0, tablet: 0 };
            visits.forEach(v => {
                if (v.deviceType === 'mobile' || v.deviceType === 'desktop' || v.deviceType === 'tablet') {
                    deviceStats[v.deviceType]++;
                }
            });
            const totalWithDevice = Object.values(deviceStats).reduce((a, b) => a + b, 0) || 1;
            return {
                timeSeries: Array.from(timeSeriesMap.values()).sort((a, b) => a.date.localeCompare(b.date)),
                funnel: {
                    visitors: visits.length,
                    successful: orders.length
                },
                devices: {
                    mobile: `${((deviceStats.mobile / totalWithDevice) * 100).toFixed(0)}%`,
                    desktop: `${((deviceStats.desktop / totalWithDevice) * 100).toFixed(0)}%`,
                    tablet: `${((deviceStats.tablet / totalWithDevice) * 100).toFixed(0)}%`
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to process channel performance data: ${error.message}`);
        }
    }
    async trackVisit(dto) {
        try {
            const visit = await this.prisma.channelVisit.create({
                data: {
                    channel: dto.channel,
                    eventId: dto.eventId,
                    ip: dto.ip,
                    userAgent: dto.userAgent,
                    deviceType: dto.deviceType,
                }
            });
            if (dto.assetCode) {
                await this.prisma.salesAsset.update({
                    where: { code: dto.assetCode },
                    data: { hits: { increment: 1 } }
                }).catch(err => console.error('Failed to increment asset hits:', err));
            }
            return visit;
        }
        catch (error) {
            console.error('Visitor tracking failed:', error);
            return { success: false, message: error.message };
        }
    }
    async createCampaign(userId, eventId, dto) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required to create a campaign');
        await this.verifyEventOwner(userId, eventId);
        try {
            return await this.prisma.marketingCampaign.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    type: dto.type,
                    discountType: dto.discountType,
                    discountValue: dto.discountValue,
                    code: dto.code,
                    location: dto.location,
                    targetTierId: dto.targetTierId,
                    eventId,
                    startDate: new Date(dto.startDate),
                    endDate: new Date(dto.endDate),
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create marketing campaign: ${error.message}`);
        }
    }
    async getCampaigns(userId, eventId) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required to list campaigns');
        await this.verifyEventOwner(userId, eventId);
        try {
            const campaigns = await this.prisma.marketingCampaign.findMany({
                where: { eventId },
                include: {
                    _count: {
                        select: { tickets: true }
                    }
                }
            });
            const now = new Date();
            return campaigns.map(c => {
                let status = 'Scheduled';
                if (now >= c.startDate && now <= c.endDate) {
                    status = 'Live';
                }
                else if (now > c.endDate) {
                    status = 'Ended';
                }
                return {
                    id: c.id,
                    name: c.name,
                    type: c.type,
                    status,
                    discount: c.discountType === 'PERCENTAGE' ? `${c.discountValue}%` : `£${c.discountValue}`,
                    sales: c._count.tickets,
                    expiry: status === 'Live' ? this.getExpiryString(c.endDate) : null,
                    location: c.location,
                };
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to retrieve marketing campaigns: ${error.message}`);
        }
    }
    getExpiryString(endDate) {
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 24) {
            return `${Math.floor(hours / 24)}d left`;
        }
        return `${hours}h ${minutes}m`;
    }
    async getSalesAssets(userId, eventId, search) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required to fetch sales assets');
        await this.verifyEventOwner(userId, eventId);
        try {
            const assets = await this.prisma.salesAsset.findMany({
                where: {
                    eventId,
                    OR: search ? [
                        { name: { contains: search, mode: 'insensitive' } },
                        { code: { contains: search, mode: 'insensitive' } }
                    ] : undefined
                },
                include: {
                    _count: {
                        select: { orders: true, tickets: true }
                    },
                    orders: {
                        where: { status: 'PICKED_UP' },
                        select: { totalAmount: true }
                    }
                }
            });
            return assets.map(asset => {
                const revenue = asset.orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
                return {
                    id: asset.id,
                    name: asset.name,
                    code: asset.code,
                    type: asset.type,
                    hits: asset.hits,
                    conversions: asset._count.orders + asset._count.tickets,
                    revenue: `£${revenue.toLocaleString()}`,
                };
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to retrieve sales assets: ${error.message}`);
        }
    }
    async createSalesAsset(userId, eventId, dto) {
        if (!eventId)
            throw new common_1.BadRequestException('Event ID is required to generate asset');
        await this.verifyEventOwner(userId, eventId);
        try {
            let code = dto.customCode;
            if (!code) {
                const prefix = dto.type.toLowerCase();
                const labelSlug = dto.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                code = `${prefix}-${labelSlug}-${random}`;
            }
            return await this.prisma.salesAsset.create({
                data: {
                    name: dto.name,
                    type: dto.type,
                    code,
                    eventId,
                    tierId: dto.tierId,
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create sales asset: ${error.message}`);
        }
    }
    async verifyEventOwner(userId, id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            select: { ownerId: true }
        });
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID "${id}" could not be found`);
        }
        if (event.ownerId !== userId) {
            throw new common_1.ForbiddenException('Access denied: You do not have permission to access sales data for this event');
        }
    }
    getChannelName(channel) {
        const names = {
            [sales_channel_enum_1.SalesChannel.MARKETPLACE]: '247GBS Marketplace',
            [sales_channel_enum_1.SalesChannel.POS]: 'POS Terminals',
            [sales_channel_enum_1.SalesChannel.AGENT]: 'Mobile Agents',
            [sales_channel_enum_1.SalesChannel.REFERRAL]: 'Referral Links',
            [sales_channel_enum_1.SalesChannel.CAMPAIGN]: 'Campaign URLs',
        };
        return names[channel];
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map