import { Module } from '@nestjs/common';
import { POSController } from './pos.controller';
import { POSService } from './pos.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [POSController],
    providers: [POSService],
    exports: [POSService]
})
export class POSModule { }
