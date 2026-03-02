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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTicketTierDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ticket_type_enum_1 = require("../enums/ticket-type.enum");
class CreateTicketTierDto {
    name;
    description;
    price;
    quantity;
    type;
    saleStart;
    saleEnd;
    transferable;
    refundable;
    rules;
    accessZones;
    productIds;
    eventCapacity;
    status;
    stockTracking;
    autoLock;
    waitlist;
}
exports.CreateTicketTierDto = CreateTicketTierDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTicketTierDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTicketTierDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: ticket_type_enum_1.TicketType, default: ticket_type_enum_1.TicketType.GENERAL }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_type_enum_1.TicketType),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "saleStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "saleEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTierDto.prototype, "transferable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTierDto.prototype, "refundable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "rules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTicketTierDto.prototype, "accessZones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String], description: 'Product IDs to bundle with this ticket tier' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTicketTierDto.prototype, "productIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Update the global event capacity' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTicketTierDto.prototype, "eventCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: 'Active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTierDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTierDto.prototype, "stockTracking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTierDto.prototype, "autoLock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTierDto.prototype, "waitlist", void 0);
//# sourceMappingURL=create-ticket-tier.dto.js.map