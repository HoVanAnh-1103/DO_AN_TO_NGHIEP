import { Module } from '@nestjs/common';
import { TypeScheduleService } from './type-schedule.service';
import { TypeScheduleController } from './type-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSchedule } from './entities/type-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeSchedule])],
  controllers: [TypeScheduleController],
  providers: [TypeScheduleService],
})
export class TypeScheduleModule {}
