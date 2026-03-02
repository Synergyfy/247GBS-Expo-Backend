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
exports.RedemptionController = void 0;
const common_1 = require("@nestjs/common");
const redemption_service_1 = require("./redemption.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
let RedemptionController = class RedemptionController {
    redemptionService;
    constructor(redemptionService) {
        this.redemptionService = redemptionService;
    }
    getStats(userId) {
        return this.redemptionService.getStats(userId);
    }
    getHistory(userId) {
        return this.redemptionService.getHistory(userId);
    }
    findOrdersByVisitor(userId, identifier) {
        return this.redemptionService.findOrdersByVisitor(userId, identifier);
    }
    redeemOrder(userId, orderId) {
        return this.redemptionService.redeemOrder(userId, orderId);
    }
};
exports.RedemptionController = RedemptionController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RedemptionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RedemptionController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('visitor/:identifier'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RedemptionController.prototype, "findOrdersByVisitor", null);
__decorate([
    (0, common_1.Post)('redeem/:orderId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RedemptionController.prototype, "redeemOrder", null);
exports.RedemptionController = RedemptionController = __decorate([
    (0, common_1.Controller)('dashboard/business/products/redemption'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [redemption_service_1.RedemptionService])
], RedemptionController);
//# sourceMappingURL=redemption.controller.js.map