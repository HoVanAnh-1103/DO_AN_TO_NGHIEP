import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ScheduleModule } from '../schedule/schedule.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationModule } from '../notification/notification.module';
import { ReceiverModule } from '../receiver/receiver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), ScheduleModule, NotificationModule,ReceiverModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [TypeOrmModule.forFeature([Class])]
  // exports:[ClassModule]
})
export class ClassModule { }
