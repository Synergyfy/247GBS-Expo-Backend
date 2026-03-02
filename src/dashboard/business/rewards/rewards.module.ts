import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RewardsController } from './rewards.controller';
import { RewardsIntegrationController } from './rewards-integration.controller';
import { RewardsMonitoringController } from './rewards-monitoring.controller';
import { RewardsService } from './rewards.service';

@Module({
    imports: [PrismaModule],
    controllers: [RewardsController, RewardsIntegrationController, RewardsMonitoringController],
    providers: [RewardsService],
    exports: [RewardsService],
})
export class RewardsModule { }
