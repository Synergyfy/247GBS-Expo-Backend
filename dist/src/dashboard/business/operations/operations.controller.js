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
exports.OperationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const operations_service_1 = require("./operations.service");
const assign_staff_dto_1 = require("./dto/assign-staff.dto");
let OperationsController = class OperationsController {
    operationsService;
    constructor(operationsService) {
        this.operationsService = operationsService;
    }
    async getStaff(userId, eventId) {
        return this.operationsService.getStaff(userId, eventId);
    }
    async assignStaff(userId, eventId, dto) {
        return this.operationsService.assignStaff(userId, eventId, dto);
    }
    async updateStaffStatus(userId, staffId, status) {
        return this.operationsService.updateStaffStatus(userId, staffId, status);
    }
    async getDiagnostics(userId, eventId) {
        return this.operationsService.getDiagnostics(userId, eventId);
    }
    async runDiagnostics(userId, eventId) {
        return this.operationsService.runDiagnostics(userId, eventId);
    }
    async getVerificationLogs(userId, eventId) {
        return this.operationsService.getVerificationLogs(userId, eventId);
    }
    async getVerificationStatus(userId, eventId) {
        return this.operationsService.getStationStatus(userId, eventId);
    }
    async getCrowdStats(userId, eventId) {
        return this.operationsService.getCrowdStats(userId, eventId);
    }
    async getZoneTraffic(userId, eventId) {
        return this.operationsService.getZoneTraffic(userId, eventId);
    }
    async getCrowdInsights(userId, eventId) {
        return this.operationsService.getCrowdInsights(userId, eventId);
    }
    async syncDatabase(userId, eventId) {
        return this.operationsService.syncDatabase(userId, eventId);
    }
};
exports.OperationsController = OperationsController;
__decorate([
    (0, common_1.Get)('staff'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getStaff", null);
__decorate([
    (0, common_1.Post)('staff'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, assign_staff_dto_1.AssignStaffDto]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "assignStaff", null);
__decorate([
    (0, common_1.Patch)('staff/:id/status'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "updateStaffStatus", null);
__decorate([
    (0, common_1.Get)('diagnostics'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getDiagnostics", null);
__decorate([
    (0, common_1.Post)('diagnostics/run'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "runDiagnostics", null);
__decorate([
    (0, common_1.Get)('verification/logs'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getVerificationLogs", null);
__decorate([
    (0, common_1.Get)('verification/status'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getVerificationStatus", null);
__decorate([
    (0, common_1.Get)('crowd/stats'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getCrowdStats", null);
__decorate([
    (0, common_1.Get)('crowd/zones'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getZoneTraffic", null);
__decorate([
    (0, common_1.Get)('crowd/insights'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "getCrowdInsights", null);
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperationsController.prototype, "syncDatabase", null);
exports.OperationsController = OperationsController = __decorate([
    (0, common_1.Controller)('dashboard/business/operations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [operations_service_1.OperationsService])
], OperationsController);
//# sourceMappingURL=operations.controller.js.map