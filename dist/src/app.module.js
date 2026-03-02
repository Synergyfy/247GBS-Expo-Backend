"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const booth_module_1 = require("./dashboard/business/booth/booth.module");
const product_module_1 = require("./dashboard/business/product/product.module");
const wallet_module_1 = require("./wallet/wallet.module");
const network_module_1 = require("./network/network.module");
const booking_module_1 = require("./booking/booking.module");
const event_module_1 = require("./event/event.module");
const event_module_2 = require("./dashboard/business/event/event.module");
const tickets_module_1 = require("./dashboard/business/tickets/tickets.module");
const sales_module_1 = require("./dashboard/business/sales/sales.module");
const rewards_module_1 = require("./dashboard/business/rewards/rewards.module");
const analytics_module_1 = require("./dashboard/business/analytics/analytics.module");
const marketplace_module_1 = require("./dashboard/business/marketplace/marketplace.module");
const fulfilment_module_1 = require("./dashboard/business/product/fulfilment/fulfilment.module");
const redemption_module_1 = require("./dashboard/business/redemption/redemption.module");
const pos_module_1 = require("./dashboard/business/pos/pos.module");
const operations_module_1 = require("./dashboard/business/operations/operations.module");
const admin_module_1 = require("./dashboard/admin/admin.module");
const revenue_module_1 = require("./dashboard/business/revenue/revenue.module");
const messages_module_1 = require("./dashboard/business/messages/messages.module");
const support_module_1 = require("./dashboard/business/support/support.module");
const settings_module_1 = require("./dashboard/business/settings/settings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, booth_module_1.BoothModule, product_module_1.ProductModule, wallet_module_1.WalletModule, network_module_1.NetworkModule, booking_module_1.BookingModule, event_module_1.EventModule, event_module_2.DashboardEventModule, tickets_module_1.TicketsModule, sales_module_1.SalesModule, rewards_module_1.RewardsModule, marketplace_module_1.MarketplaceModule, fulfilment_module_1.FulfilmentModule, redemption_module_1.RedemptionModule, analytics_module_1.AnalyticsModule, pos_module_1.POSModule, operations_module_1.OperationsModule, admin_module_1.AdminModule, revenue_module_1.RevenueModule, messages_module_1.MessagesModule, support_module_1.SupportModule, settings_module_1.SettingsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map