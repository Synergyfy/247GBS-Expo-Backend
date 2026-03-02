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
exports.MarketplaceController = void 0;
const common_1 = require("@nestjs/common");
const marketplace_service_1 = require("./marketplace.service");
const get_marketplace_events_dto_1 = require("./dto/get-marketplace-events.dto");
const checkout_dto_1 = require("./dto/checkout.dto");
let MarketplaceController = class MarketplaceController {
    marketplaceService;
    constructor(marketplaceService) {
        this.marketplaceService = marketplaceService;
    }
    findAll(query) {
        return this.marketplaceService.getAllEvents(query);
    }
    getCategories() {
        return this.marketplaceService.getCategories();
    }
    checkout(userId, data) {
        return this.marketplaceService.checkout(userId, data);
    }
    findOne(id) {
        return this.marketplaceService.getEventById(id);
    }
};
exports.MarketplaceController = MarketplaceController;
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_marketplace_events_dto_1.GetMarketplaceEventsDto]),
    __metadata("design:returntype", void 0)
], MarketplaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarketplaceController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, checkout_dto_1.CheckoutDto]),
    __metadata("design:returntype", void 0)
], MarketplaceController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketplaceController.prototype, "findOne", null);
exports.MarketplaceController = MarketplaceController = __decorate([
    (0, common_1.Controller)('marketplace'),
    __metadata("design:paramtypes", [marketplace_service_1.MarketplaceService])
], MarketplaceController);
//# sourceMappingURL=marketplace.controller.js.map