import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BoothModule } from './dashboard/business/booth/booth.module';
import { ProductModule } from './dashboard/business/product/product.module';
import { WalletModule } from './wallet/wallet.module';
import { NetworkModule } from './network/network.module';
import { BookingModule } from './booking/booking.module';
import { EventModule } from './event/event.module';
import { DashboardEventModule } from './dashboard/business/event/event.module';
import { TicketsModule } from './dashboard/business/tickets/tickets.module';
import { SalesModule } from './dashboard/business/sales/sales.module';
import { RewardsModule } from './dashboard/business/rewards/rewards.module';
import { AnalyticsModule } from './dashboard/business/analytics/analytics.module';

import { MarketplaceModule } from './dashboard/business/marketplace/marketplace.module';
import { FulfilmentModule } from './dashboard/business/product/fulfilment/fulfilment.module';
import { RedemptionModule } from './dashboard/business/redemption/redemption.module';
import { POSModule } from './dashboard/business/pos/pos.module';
import { OperationsModule } from './dashboard/business/operations/operations.module';
import { AdminModule } from './dashboard/admin/admin.module';
import { RevenueModule } from './dashboard/business/revenue/revenue.module';
import { MessagesModule } from './dashboard/business/messages/messages.module';
import { SupportModule } from './dashboard/business/support/support.module';
import { SettingsModule } from './dashboard/business/settings/settings.module';

@Module({
  imports: [PrismaModule, AuthModule, BoothModule, ProductModule, WalletModule, NetworkModule, BookingModule, EventModule, DashboardEventModule, TicketsModule, SalesModule, RewardsModule, MarketplaceModule, FulfilmentModule, RedemptionModule, AnalyticsModule, POSModule, OperationsModule, AdminModule, RevenueModule, MessagesModule, SupportModule, SettingsModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule { }
