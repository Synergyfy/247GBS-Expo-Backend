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
exports.RewardsIntegrationController = void 0;
const common_1 = require("@nestjs/common");
const rewards_service_1 = require("./rewards.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
let RewardsIntegrationController = class RewardsIntegrationController {
    rewardsService;
    constructor(rewardsService) {
        this.rewardsService = rewardsService;
    }
    getIntegrationStatus(userId, eventId) {
        return this.rewardsService.getIntegrationStatus(userId, eventId);
    }
    listIntegrations(userId, eventId) {
        return this.rewardsService.listIntegrations(userId, eventId);
    }
};
exports.RewardsIntegrationController = RewardsIntegrationController;
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RewardsIntegrationController.prototype, "getIntegrationStatus", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RewardsIntegrationController.prototype, "listIntegrations", null);
exports.RewardsIntegrationController = RewardsIntegrationController = __decorate([
    (0, common_1.Controller)('dashboard/business/rewards/integrations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rewards_service_1.RewardsService])
], RewardsIntegrationController);
//# sourceMappingURL=rewards-integration.controller.js.map