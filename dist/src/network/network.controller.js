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
exports.NetworkController = void 0;
const common_1 = require("@nestjs/common");
const network_service_1 = require("./network.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let NetworkController = class NetworkController {
    networkService;
    constructor(networkService) {
        this.networkService = networkService;
    }
    getReferralTree(userId) {
        return this.networkService.getReferralTree(userId);
    }
    getNetworkStats(userId) {
        return this.networkService.getNetworkStats(userId);
    }
    joinNetwork(userId, data) {
        return this.networkService.setReferrer(userId, data.referrerId);
    }
};
exports.NetworkController = NetworkController;
__decorate([
    (0, common_1.Get)('tree'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NetworkController.prototype, "getReferralTree", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NetworkController.prototype, "getNetworkStats", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NetworkController.prototype, "joinNetwork", null);
exports.NetworkController = NetworkController = __decorate([
    (0, common_1.Controller)('network'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkController);
//# sourceMappingURL=network.controller.js.map