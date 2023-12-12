import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ReceiverModule } from './receiver/receiver.module';
import { StudentOfClassModule } from './student-of-class/student-of-class.module';
import { ClassModule } from './class/class.module';
import { SessionInformationModule } from './session-information/session-information.module';
import { NotificationModule } from './notification/notification.module';
import { SubjectModule } from './subject/subject.module';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from './schedule/schedule.module';
import { LessionStatusModule } from './lession-status/lession-status.module';
import { RequestModule } from './request/request.module';
import { TypeScheduleModule } from './type-schedule/type-schedule.module';
import { CategoryModule } from './category/category.module';
import { RequestTypeModule } from './request-type/request-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'localhostdb',
      entities: [],
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    ReceiverModule,
    StudentOfClassModule,
    ClassModule,
    SessionInformationModule,
    NotificationModule,
    SubjectModule,
    RoomModule,
    ScheduleModule,
    LessionStatusModule,
    RequestModule,
    TypeScheduleModule,
    CategoryModule,
    RequestTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
