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
exports.FulfilmentController = void 0;
const common_1 = require("@nestjs/common");
const fulfilment_service_1 = require("./fulfilment.service");
const jwt_auth_guard_1 = require("../../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../../auth/get-user.decorator");
const fulfilment_point_dto_1 = require("./dto/fulfilment-point.dto");
const fulfilment_slot_dto_1 = require("./dto/fulfilment-slot.dto");
let FulfilmentController = class FulfilmentController {
    fulfilmentService;
    constructor(fulfilmentService) {
        this.fulfilmentService = fulfilmentService;
    }
    getStats(userId) {
        return this.fulfilmentService.getStats(userId);
    }
    getInventory(userId) {
        return this.fulfilmentService.getInventory(userId);
    }
    getPoints(userId) {
        return this.fulfilmentService.getPoints(userId);
    }
    createPoint(userId, data) {
        return this.fulfilmentService.createPoint(userId, data);
    }
    updatePoint(userId, id, data) {
        return this.fulfilmentService.updatePoint(userId, id, data);
    }
    getSlots(userId) {
        return this.fulfilmentService.getSlots(userId);
    }
    updateSlot(userId, id, data) {
        return this.fulfilmentService.updateSlot(userId, id, data);
    }
    getExceptions(userId) {
        return this.fulfilmentService.getExceptions(userId);
    }
    resolveException(userId, id) {
        return this.fulfilmentService.resolveException(userId, id);
    }
    notifyCustomers(userId, id) {
        return this.fulfilmentService.notifyCustomers(userId, id);
    }
    handleSubstitution(userId, productId) {
        return this.fulfilmentService.handleSubstitution(userId, productId);
    }
};
exports.FulfilmentController = FulfilmentController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('inventory'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Get)('points'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "getPoints", null);
__decorate([
    (0, common_1.Post)('points'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fulfilment_point_dto_1.CreateFulfilmentPointDto]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "createPoint", null);
__decorate([
    (0, common_1.Patch)('points/:id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, fulfilment_point_dto_1.UpdateFulfilmentPointDto]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "updatePoint", null);
__decorate([
    (0, common_1.Get)('slots'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "getSlots", null);
__decorate([
    (0, common_1.Patch)('slots/:id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, fulfilment_slot_dto_1.UpdateFulfilmentSlotDto]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "updateSlot", null);
__decorate([
    (0, common_1.Get)('exceptions'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "getExceptions", null);
__decorate([
    (0, common_1.Patch)('exceptions/:id/resolve'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "resolveException", null);
__decorate([
    (0, common_1.Post)('exceptions/:id/notify'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "notifyCustomers", null);
__decorate([
    (0, common_1.Post)('substitute/:productId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FulfilmentController.prototype, "handleSubstitution", null);
exports.FulfilmentController = FulfilmentController = __decorate([
    (0, common_1.Controller)('dashboard/business/products/fulfilment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [fulfilment_service_1.FulfilmentService])
], FulfilmentController);
//# sourceMappingURL=fulfilment.controller.js.map