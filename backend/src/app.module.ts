import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { ClassModule } from './modules/class/class.module';
import { LessionStatusModule } from './modules/lession-status/lession-status.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ReceiverModule } from './modules/receiver/receiver.module';
import { RequestTypeModule } from './modules/request-type/request-type.module';
import { RequestModule } from './modules/request/request.module';
import { RoleModule } from './modules/role/role.module';
import { RoomModule } from './modules/room/room.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SessionInformationModule } from './modules/session-information/session-information.module';
import { StudentOfClassModule } from './modules/student-of-class/student-of-class.module';
import { SubjectModule } from './modules/subject/subject.module';
import { TypeScheduleModule } from './modules/type-schedule/type-schedule.module';

import { AuthModule } from './modules/auth/auth.module';
import { DataSource } from 'typeorm';

import { Role } from './modules/role/entities/role.entity';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { TypeSchedule } from './modules/type-schedule/entities/type-schedule.entity';
import { Class } from './modules/class/entities/class.entity';
import { Schedule } from './modules/schedule/entities/schedule.entity';
import { Room } from './modules/room/entities/room.entity';
import { Subject } from './modules/subject/entities/subject.entity';
import { Category } from './modules/category/entities/category.entity';
import { TeacherModule } from './modules/teacher/teacher.module';
import { Teacher } from './modules/teacher/entities/teacher.entity';
import { SignModule } from './modules/sign/sign.module';
import { Sign } from './modules/sign/entities/sign.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'localhostdb',
      entities: [User, Role, Class, Schedule, TypeSchedule, Room, Subject, Category, Teacher,Sign],
      migrations: [User, Role, Class, Schedule, TypeSchedule, Room, Subject, Category, Sign],

      // synchronize: true,
      autoLoadEntities: true,

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
    RequestTypeModule,
    AuthModule,
    TeacherModule,
    SignModule]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
