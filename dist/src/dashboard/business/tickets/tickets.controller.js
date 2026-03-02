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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const create_ticket_tier_dto_1 = require("./dto/create-ticket-tier.dto");
const update_ticket_tier_dto_1 = require("./dto/update-ticket-tier.dto");
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    createTicketTier(userId, eventId, createTicketTierDto) {
        return this.ticketsService.createTicketTier(userId, eventId, createTicketTierDto);
    }
    getTicketTiers(userId, eventId) {
        return this.ticketsService.getTicketTiers(userId, eventId);
    }
    updateTicketTier(userId, eventId, tierId, updateTicketTierDto) {
        return this.ticketsService.updateTicketTier(userId, eventId, tierId, updateTicketTierDto);
    }
    deleteTicketTier(userId, eventId, tierId) {
        return this.ticketsService.deleteTicketTier(userId, eventId, tierId);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(':eventId/ticket-tiers'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_ticket_tier_dto_1.CreateTicketTierDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "createTicketTier", null);
__decorate([
    (0, common_1.Get)(':eventId/ticket-tiers'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicketTiers", null);
__decorate([
    (0, common_1.Patch)(':eventId/ticket-tiers/:tierId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('tierId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, update_ticket_tier_dto_1.UpdateTicketTierDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "updateTicketTier", null);
__decorate([
    (0, common_1.Delete)(':eventId/ticket-tiers/:tierId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('tierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "deleteTicketTier", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)('dashboard/business/events'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map