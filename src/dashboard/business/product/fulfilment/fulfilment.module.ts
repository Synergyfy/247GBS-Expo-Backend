import { Module } from '@nestjs/common';
import { FulfilmentService } from './fulfilment.service';
import { FulfilmentController } from './fulfilment.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [FulfilmentController],
    providers: [FulfilmentService],
    exports: [FulfilmentService],
})
export class FulfilmentModule { }
