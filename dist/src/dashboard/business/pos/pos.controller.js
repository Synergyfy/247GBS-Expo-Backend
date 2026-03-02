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
exports.POSController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const pos_service_1 = require("./pos.service");
const pair_scanner_dto_1 = require("./dto/pair-scanner.dto");
let POSController = class POSController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    async getDevices(userId, eventId) {
        return this.posService.getDevices(userId, eventId);
    }
    async pairDevice(userId, eventId, dto) {
        return this.posService.pairDevice(userId, eventId, dto);
    }
    async getAttendanceStats(userId, eventId) {
        return this.posService.getAttendanceStats(userId, eventId);
    }
};
exports.POSController = POSController;
__decorate([
    (0, common_1.Get)('devices'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], POSController.prototype, "getDevices", null);
__decorate([
    (0, common_1.Post)('pair'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, pair_scanner_dto_1.PairScannerDto]),
    __metadata("design:returntype", Promise)
], POSController.prototype, "pairDevice", null);
__decorate([
    (0, common_1.Get)('attendance'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], POSController.prototype, "getAttendanceStats", null);
exports.POSController = POSController = __decorate([
    (0, common_1.Controller)('dashboard/business/pos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pos_service_1.POSService])
], POSController);
//# sourceMappingURL=pos.controller.js.map