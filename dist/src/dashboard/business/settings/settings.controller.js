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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const assign_staff_dto_1 = require("../operations/dto/assign-staff.dto");
let SettingsController = class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getProfile(userId) {
        return this.settingsService.getProfile(userId);
    }
    async updateProfile(userId, data) {
        return this.settingsService.updateProfile(userId, data);
    }
    async getTeam(userId) {
        return this.settingsService.getTeam(userId);
    }
    async addTeamMember(userId, data) {
        return this.settingsService.addTeamMember(userId, data);
    }
    async removeTeamMember(userId, id) {
        return this.settingsService.removeTeamMember(userId, id);
    }
    async getIntegrations(userId) {
        return this.settingsService.getIntegrations(userId);
    }
    async getAuditLogs(userId) {
        return this.settingsService.getAuditLogs(userId);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('team'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Post)('team'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_staff_dto_1.AssignStaffDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "addTeamMember", null);
__decorate([
    (0, common_1.Delete)('team/:id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "removeTeamMember", null);
__decorate([
    (0, common_1.Get)('integrations'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getIntegrations", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAuditLogs", null);
exports.SettingsController = SettingsController = __decorate([
    (0, common_1.Controller)('dashboard/business/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map