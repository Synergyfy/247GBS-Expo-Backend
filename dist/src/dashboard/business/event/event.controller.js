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
exports.DashboardEventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../../auth/get-user.decorator");
const create_event_dto_1 = require("../../../event/dto/create-event.dto");
const update_event_dto_1 = require("../../../event/dto/update-event.dto");
const get_events_query_dto_1 = require("../../../event/dto/get-events-query.dto");
const create_session_dto_1 = require("./dto/create-session.dto");
const update_session_dto_1 = require("./dto/update-session.dto");
const create_speaker_dto_1 = require("./dto/create-speaker.dto");
const update_speaker_dto_1 = require("./dto/update-speaker.dto");
const link_products_dto_1 = require("./dto/link-products.dto");
const save_booth_layout_dto_1 = require("./dto/save-booth-layout.dto");
let DashboardEventController = class DashboardEventController {
    eventService;
    constructor(eventService) {
        this.eventService = eventService;
    }
    create(userId, createEventDto) {
        return this.eventService.createMyEvent(userId, createEventDto);
    }
    findAll(userId, query) {
        return this.eventService.findMyEvents(userId, query);
    }
    checkIn(userId, ticketId) {
        return this.eventService.checkInTicket(userId, ticketId);
    }
    findOne(userId, id) {
        return this.eventService.findMyEventById(userId, id);
    }
    update(userId, id, updateEventDto) {
        return this.eventService.updateMyEvent(userId, id, updateEventDto);
    }
    remove(userId, id) {
        return this.eventService.deleteMyEvent(userId, id);
    }
    getSessions(userId, eventId) {
        return this.eventService.getSessions(userId, eventId);
    }
    createSession(userId, eventId, createSessionDto) {
        return this.eventService.createSession(userId, eventId, createSessionDto);
    }
    updateSession(userId, eventId, sessionId, updateSessionDto) {
        return this.eventService.updateSession(userId, eventId, sessionId, updateSessionDto);
    }
    deleteSession(userId, eventId, sessionId) {
        return this.eventService.deleteSession(userId, eventId, sessionId);
    }
    getSpeakers(userId, eventId) {
        return this.eventService.getSpeakers(userId, eventId);
    }
    createSpeaker(userId, eventId, createSpeakerDto) {
        return this.eventService.createSpeaker(userId, eventId, createSpeakerDto);
    }
    updateSpeaker(userId, eventId, speakerId, updateSpeakerDto) {
        return this.eventService.updateSpeaker(userId, eventId, speakerId, updateSpeakerDto);
    }
    deleteSpeaker(userId, eventId, speakerId) {
        return this.eventService.deleteSpeaker(userId, eventId, speakerId);
    }
    getBoothLayout(userId, eventId) {
        return this.eventService.getBoothLayout(userId, eventId);
    }
    saveBoothLayout(userId, eventId, saveBoothLayoutDto) {
        return this.eventService.saveBoothLayout(userId, eventId, saveBoothLayoutDto.layout);
    }
    getEventProducts(userId, eventId) {
        return this.eventService.getEventProducts(userId, eventId);
    }
    getMyInventory(userId) {
        return this.eventService.getMyInventory(userId);
    }
    linkProducts(userId, eventId, linkProductsDto) {
        return this.eventService.linkProducts(userId, eventId, linkProductsDto.productIds);
    }
    unlinkProduct(userId, eventId, productId) {
        return this.eventService.unlinkProduct(userId, eventId, productId);
    }
};
exports.DashboardEventController = DashboardEventController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_events_query_dto_1.GetEventsQueryDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('check-in/:ticketId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':eventId/sessions'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Post)(':eventId/sessions'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "createSession", null);
__decorate([
    (0, common_1.Patch)(':eventId/sessions/:sessionId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('sessionId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, update_session_dto_1.UpdateSessionDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Delete)(':eventId/sessions/:sessionId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Get)(':eventId/speakers'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "getSpeakers", null);
__decorate([
    (0, common_1.Post)(':eventId/speakers'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_speaker_dto_1.CreateSpeakerDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "createSpeaker", null);
__decorate([
    (0, common_1.Patch)(':eventId/speakers/:speakerId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('speakerId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, update_speaker_dto_1.UpdateSpeakerDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "updateSpeaker", null);
__decorate([
    (0, common_1.Delete)(':eventId/speakers/:speakerId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('speakerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "deleteSpeaker", null);
__decorate([
    (0, common_1.Get)(':eventId/booth-layout'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "getBoothLayout", null);
__decorate([
    (0, common_1.Put)(':eventId/booth-layout'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, save_booth_layout_dto_1.SaveBoothLayoutDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "saveBoothLayout", null);
__decorate([
    (0, common_1.Get)(':eventId/products'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "getEventProducts", null);
__decorate([
    (0, common_1.Get)('inventory/my-products'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "getMyInventory", null);
__decorate([
    (0, common_1.Post)(':eventId/products/link'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, link_products_dto_1.LinkProductsDto]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "linkProducts", null);
__decorate([
    (0, common_1.Delete)(':eventId/products/:productId'),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DashboardEventController.prototype, "unlinkProduct", null);
exports.DashboardEventController = DashboardEventController = __decorate([
    (0, common_1.Controller)('dashboard/business/events'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [event_service_1.DashboardEventService])
], DashboardEventController);
//# sourceMappingURL=event.controller.js.map