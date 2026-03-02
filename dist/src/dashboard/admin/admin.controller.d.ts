import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        success: boolean;
        data: {
            totalUsers: number;
            totalBusinesses: number;
            activeEvents: number;
        };
    }>;
    getPendingApprovals(): Promise<{
        success: boolean;
        data: never[];
    }>;
    approveItem(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    rejectItem(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllBusinesses(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getAllUsers(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getRevenueStats(): Promise<{
        success: boolean;
        data: {
            totalRevenue: number;
        };
    }>;
    getPassPlans(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getSystemHealth(): Promise<{
        success: boolean;
        data: {
            status: string;
            uptime: number;
            timestamp: string;
        };
    }>;
    getNews(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getTickerItems(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getConfiguration(): Promise<{
        success: boolean;
        data: {};
    }>;
    getAuditLogs(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getReports(): Promise<{
        success: boolean;
        data: never[];
    }>;
    getDisputes(): Promise<{
        success: boolean;
        data: never[];
    }>;
}
