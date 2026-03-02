import { Module } from '@nestjs/common';
import { BoothService } from './booth.service';
import { BoothController } from './booth.controller';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BoothService],
  controllers: [BoothController],
  exports: [BoothService],
})
export class BoothModule { }
