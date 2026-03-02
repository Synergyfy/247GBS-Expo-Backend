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
exports.BoothController = void 0;
const common_1 = require("@nestjs/common");
const booth_service_1 = require("./booth.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const create_booth_dto_1 = require("./dto/create-booth.dto");
const update_booth_dto_1 = require("./dto/update-booth.dto");
let BoothController = class BoothController {
    boothService;
    constructor(boothService) {
        this.boothService = boothService;
    }
    async setupBooth(userId, data) {
        return this.boothService.setupBooth(userId, data);
    }
    async updateBooth(userId, data) {
        return this.boothService.updateBooth(userId, data);
    }
    async getMyBooth(userId) {
        return this.boothService.getMyBooth(userId);
    }
    async getBoothById(id) {
        return this.boothService.getBoothById(id);
    }
    async getAllBooths() {
        return this.boothService.getAllBooths();
    }
    async getDashboardStats(userId) {
        return this.boothService.getDashboardStats(userId);
    }
};
exports.BoothController = BoothController;
__decorate([
    (0, common_1.Post)('booth/setup'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_booth_dto_1.CreateBoothDto]),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "setupBooth", null);
__decorate([
    (0, common_1.Patch)('booth/update'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booth_dto_1.UpdateBoothDto]),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "updateBooth", null);
__decorate([
    (0, common_1.Get)('booth/me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "getMyBooth", null);
__decorate([
    (0, common_1.Get)('booth/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "getBoothById", null);
__decorate([
    (0, common_1.Get)('booths'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "getAllBooths", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoothController.prototype, "getDashboardStats", null);
exports.BoothController = BoothController = __decorate([
    (0, common_1.Controller)('business'),
    __metadata("design:paramtypes", [booth_service_1.BoothService])
], BoothController);
//# sourceMappingURL=booth.controller.js.map