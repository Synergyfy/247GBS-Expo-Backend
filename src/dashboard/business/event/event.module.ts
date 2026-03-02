import { Module } from '@nestjs/common';
import { DashboardEventService } from './event.service';
import { DashboardEventController } from './event.controller';

@Module({
    controllers: [DashboardEventController],
    providers: [DashboardEventService],
    exports: [DashboardEventService],
})
export class DashboardEventModule { }
