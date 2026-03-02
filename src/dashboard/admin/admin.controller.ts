import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('dashboard/stats')
    async getDashboardStats() {
        return this.adminService.getDashboardStats();
    }

    @Get('approvals/pending')
    async getPendingApprovals() {
        return this.adminService.getPendingApprovals();
    }

    @Post('approvals/:id/approve')
    async approveItem(@Param('id') id: string) {
        return this.adminService.approveItem(id);
    }

    @Post('approvals/:id/reject')
    async rejectItem(@Param('id') id: string) {
        return this.adminService.rejectItem(id);
    }

    @Get('businesses')
    async getAllBusinesses() {
        return this.adminService.getAllBusinesses();
    }

    @Get('users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Get('revenue/stats')
    async getRevenueStats() {
        return this.adminService.getRevenueStats();
    }

    @Get('passes')
    async getPassPlans() {
        return this.adminService.getPassPlans();
    }

    @Get('health')
    async getSystemHealth() {
        return this.adminService.getSystemHealth();
    }

    @Get('news')
    async getNews() {
        return this.adminService.getNews();
    }

    @Get('ticker')
    async getTickerItems() {
        return this.adminService.getTickerItems();
    }

    @Get('configuration')
    async getConfiguration() {
        return this.adminService.getConfiguration();
    }

    @Get('audit-logs')
    async getAuditLogs() {
        return this.adminService.getAuditLogs();
    }

    @Get('reports')
    async getReports() {
        return this.adminService.getReports();
    }

    @Get('disputes')
    async getDisputes() {
        return this.adminService.getDisputes();
    }
}
