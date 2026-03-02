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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesPerformance(userId, eventId) {
        const event = await this.verifyEventOwner(userId, eventId);
        const orders = await this.prisma.order.findMany({
            where: { eventId, status: 'PICKED_UP' },
            select: { totalAmount: true, createdAt: true, channel: true }
        });
        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
        const totalTickets = await this.prisma.ticket.count({ where: { eventId } });
        const totalVisitors = await this.prisma.channelVisit.count({ where: { eventId } });
        const conversionRate = totalVisitors > 0 ? (orders.length / totalVisitors) * 100 : 0;
        const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
        const now = new Date();
        const start = new Date(event.startDate);
        const diffTime = Math.abs(now.getTime() - start.getTime());
        const daysElapsed = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
        const dailyAvgRevenue = totalRevenue / daysElapsed;
        const estMonthly = dailyAvgRevenue * 30;
        const midpoint = new Date(start.getTime() + diffTime / 2);
        const recentOrders = orders.filter(o => o.createdAt >= midpoint);
        const prevOrders = orders.filter(o => o.createdAt < midpoint);
        const recentRevenue = recentOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
        const prevRevenue = prevOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
        const trend = prevRevenue > 0 ? ((recentRevenue - prevRevenue) / prevRevenue) * 100 : 0;
        const trendSign = trend >= 0 ? "+" : "";
        const channelStats = orders.reduce((acc, o) => {
            const channel = o.channel || 'MARKETPLACE';
            if (!acc[channel])
                acc[channel] = { revenue: 0, volume: 0 };
            acc[channel].revenue += Number(o.totalAmount);
            acc[channel].volume += 1;
            return acc;
        }, {});
        const channelDistribution = Object.entries(channelStats).map(([name, stats]) => ({
            name: this.formatChannelName(name),
            revenue: `£${stats.revenue.toLocaleString()}`,
            volume: stats.volume,
            pct: totalRevenue > 0 ? Math.round((stats.revenue / totalRevenue) * 100) : 0
        }));
        const generalTier = await this.prisma.ticketTier.findFirst({
            where: { eventId, name: { contains: 'General', mode: 'insensitive' } }
        });
        let sellOutDays = "30d+";
        let exhaustionMsg = "Stable inventory levels based on current velocity.";
        if (generalTier) {
            const soldCount = await this.prisma.ticket.count({ where: { tierId: generalTier.id } });
            const remaining = Math.max(generalTier.quantity - soldCount, 0);
            const dailySoldAvg = totalTickets / daysElapsed;
            if (dailySoldAvg > 0) {
                const days = Math.round(remaining / dailySoldAvg);
                sellOutDays = days > 30 ? "30d+" : `${days}d`;
                exhaustionMsg = `Based on current velocity, your ${generalTier.name} tickets will sell out in ${days} days.`;
            }
        }
        return {
            stats: [
                { label: "Total Revenue", val: `£${totalRevenue.toLocaleString()}`, trend: `${trendSign}${trend.toFixed(1)}%`, isUp: trend >= 0 },
                { label: "Tickets Sold", val: totalTickets.toLocaleString(), trend: "+8.2%", isUp: true },
                { label: "Conversion Rate", val: `${conversionRate.toFixed(2)}%`, trend: "-0.4%", isUp: false },
                { label: "Avg. Order Value", val: `£${avgOrderValue.toFixed(2)}`, trend: "+2.1%", isUp: true },
            ],
            channels: channelDistribution,
            forecast: {
                estimatedMonthlyRevenue: `£${(estMonthly / 1000).toFixed(1)}K`,
                trendingPct: `${trendSign}${trend.toFixed(0)}%`,
                trendingMessage: `Trending ${Math.abs(trend).toFixed(0)}% ${trend >= 0 ? 'above' : 'below'} goal`,
                sellOutDays,
                exhaustionMessage: exhaustionMsg
            }
        };
    }
    async getAttendanceTraffic(userId, eventId) {
        await this.verifyEventOwner(userId, eventId);
        const visitors = await this.prisma.channelVisit.count({ where: { eventId } });
        return {
            mainStats: [
                { id: "visitors", label: "Unique Booth Visitors", val: visitors.toLocaleString(), icon: 'Users', color: "text-blue-600", bg: "bg-blue-50" },
                { id: "dwell", label: "Avg. Dwell Time", val: "4m 12s", icon: 'Clock', color: "text-orange-600", bg: "bg-orange-50" },
                { id: "conversion", label: "Lead Conversion", val: "18.4%", icon: 'MousePointer2', color: "text-emerald-600", bg: "bg-emerald-50" },
            ],
            heatmap: {
                totalVisits: visitors,
                zones: [
                    { name: "Product Gallery", val: "4.2k Visits", pct: 35 },
                    { name: "Live Stage", val: "8.1k Visits", pct: 65 }
                ]
            },
            peakTraffic: {
                labels: ["09:00 AM", "12:00 PM", "06:00 PM"],
                series: [20, 40, 30, 60, 90, 100, 70, 40, 20]
            },
            insight: "Visitors who attend a Live Demo are 3.5x more likely to complete a product purchase within the same session."
        };
    }
    async getFinancialHealth(userId, eventId) {
        await this.verifyEventOwner(userId, eventId);
        const orders = await this.prisma.order.findMany({
            where: { eventId, status: 'PICKED_UP' },
            select: { totalAmount: true }
        });
        const grossRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
        const platformComm = grossRevenue * 0.125;
        const tax = grossRevenue * 0.05;
        const netMerchant = grossRevenue - platformComm - tax;
        return {
            revenueDistribution: {
                net: 82,
                breakdown: [
                    { label: "Merchant Net", amount: `£${netMerchant.toLocaleString()}`, color: "bg-orange-500" },
                    { label: "Platform Commission", amount: `£${platformComm.toLocaleString()}`, color: "bg-blue-500" },
                    { label: "Tax/VAT", amount: `£${tax.toLocaleString()}`, color: "bg-slate-200" }
                ]
            },
            riskMonitor: [
                { label: "Refund Ratio", value: "0.12%", status: "LOW" },
                { label: "Chargeback Rate", value: "0.02%", status: "LOW" },
                { label: "Settlement Accuracy", value: "100%", status: "OK" }
            ],
            projection: `£${(grossRevenue * 12).toLocaleString()}`
        };
    }
    async verifyEventOwner(userId, id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event)
            throw new common_1.NotFoundException(`Event NOT found`);
        if (event.ownerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return event;
    }
    formatChannelName(channel) {
        const names = {
            'MARKETPLACE': '247GBS Marketplace',
            'POS': 'Direct POS',
            'CAMPAIGN': 'Campaign URLs',
            'REFERRAL': 'Affiliate Networks'
        };
        return names[channel] || channel;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map