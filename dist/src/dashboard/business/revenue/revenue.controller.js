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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueController = void 0;
const common_1 = require("@nestjs/common");
const revenue_service_1 = require("./revenue.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/roles.guard");
const roles_decorator_1 = require("../../../auth/roles.decorator");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
let RevenueController = class RevenueController {
    revenueService;
    constructor(revenueService) {
        this.revenueService = revenueService;
    }
    async getWallet(userId) {
        return this.revenueService.getWallet(userId);
    }
    async getPayoutSchedule(userId) {
        return this.revenueService.getPayoutSchedule(userId);
    }
    async getLedger(userId) {
        return this.revenueService.getLedgerTransactions(userId);
    }
    async updateSettings(userId, body) {
        return this.revenueService.updateSettings(userId, body);
    }
    async getFinanceTickets(userId) {
        return this.revenueService.getFinanceTickets(userId);
    }
    async getFinanceTicketById(userId, id) {
        return this.revenueService.getFinanceTicketById(userId, id);
    }
    async createFinanceTicket(userId, body) {
        return this.revenueService.openFinanceTicket(userId, body);
    }
};
exports.RevenueController = RevenueController;
__decorate([
    (0, common_1.Get)('wallet'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('payouts'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getPayoutSchedule", null);
__decorate([
    (0, common_1.Get)('ledger'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getLedger", null);
__decorate([
    (0, common_1.Patch)('settings'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)('tickets'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getFinanceTickets", null);
__decorate([
    (0, common_1.Get)('tickets/:id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getFinanceTicketById", null);
__decorate([
    (0, common_1.Post)('tickets'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "createFinanceTicket", null);
exports.RevenueController = RevenueController = __decorate([
    (0, common_1.Controller)('dashboard/business/revenue'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('BUSINESS_OWNER', 'VENDOR'),
    __metadata("design:paramtypes", [revenue_service_1.RevenueService])
], RevenueController);
//# sourceMappingURL=revenue.controller.js.map