import { PrismaService } from '../../../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSalesPerformance(userId: string, eventId: string): Promise<{
        stats: {
            label: string;
            val: string;
            trend: string;
            isUp: boolean;
        }[];
        channels: {
            name: string;
            revenue: string;
            volume: number;
            pct: number;
        }[];
        forecast: {
            estimatedMonthlyRevenue: string;
            trendingPct: string;
            trendingMessage: string;
            sellOutDays: string;
            exhaustionMessage: string;
        };
    }>;
    getAttendanceTraffic(userId: string, eventId: string): Promise<{
        mainStats: {
            id: string;
            label: string;
            val: string;
            icon: string;
            color: string;
            bg: string;
        }[];
        heatmap: {
            totalVisits: number;
            zones: {
                name: string;
                val: string;
                pct: number;
            }[];
        };
        peakTraffic: {
            labels: string[];
            series: number[];
        };
        insight: string;
    }>;
    getFinancialHealth(userId: string, eventId: string): Promise<{
        revenueDistribution: {
            net: number;
            breakdown: {
                label: string;
                amount: string;
                color: string;
            }[];
        };
        riskMonitor: {
            label: string;
            value: string;
            status: string;
        }[];
        projection: string;
    }>;
    private verifyEventOwner;
    private formatChannelName;
}
