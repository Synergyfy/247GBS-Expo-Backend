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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const create_campaign_dto_1 = require("./dto/create-campaign.dto");
const create_sales_asset_dto_1 = require("./dto/create-sales-asset.dto");
const track_visit_dto_1 = require("./dto/track-visit.dto");
let SalesController = class SalesController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    getSalesStats(userId, eventId) {
        return this.salesService.getSalesStats(userId, eventId);
    }
    getChannelsData(userId, eventId) {
        return this.salesService.getChannelsData(userId, eventId);
    }
    getChannelPerformance(userId, eventId, channel) {
        return this.salesService.getChannelPerformance(userId, eventId, channel);
    }
    createCampaign(userId, eventId, dto) {
        return this.salesService.createCampaign(userId, eventId, dto);
    }
    getCampaigns(userId, eventId) {
        return this.salesService.getCampaigns(userId, eventId);
    }
    trackVisit(dto) {
        return this.salesService.trackVisit(dto);
    }
    getSalesAssets(userId, eventId, search) {
        return this.salesService.getSalesAssets(userId, eventId, search);
    }
    createSalesAsset(userId, eventId, dto) {
        return this.salesService.createSalesAsset(userId, eventId, dto);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getSalesStats", null);
__decorate([
    (0, common_1.Get)('channels'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getChannelsData", null);
__decorate([
    (0, common_1.Get)('channels/:channel/performance'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Param)('channel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getChannelPerformance", null);
__decorate([
    (0, common_1.Post)('campaigns'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_campaign_dto_1.CreateCampaignDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Get)('campaigns'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getCampaigns", null);
__decorate([
    (0, common_1.Post)('track-visit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_visit_dto_1.TrackVisitDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "trackVisit", null);
__decorate([
    (0, common_1.Get)('links'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getSalesAssets", null);
__decorate([
    (0, common_1.Post)('links'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_sales_asset_dto_1.CreateSalesAssetDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createSalesAsset", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)('dashboard/business/sales'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map