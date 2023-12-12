import { Module } from '@nestjs/common';
import { TypeScheduleService } from './type-schedule.service';
import { TypeScheduleController } from './type-schedule.controller';

@Module({
  controllers: [TypeScheduleController],
  providers: [TypeScheduleService],
})
export class TypeScheduleModule {}
