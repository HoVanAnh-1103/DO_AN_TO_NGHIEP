import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { cas } from 'src/constants';
import { ScheduleService } from '../schedule/schedule.service';
import {
  Notification,
  notificationTypeEnum,
} from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { Receiver } from '../receiver/entities/receiver.entity';
import { ReceiverService } from '../receiver/receiver.service';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    private readonly receiverService: ReceiverService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    console.log(createClassDto);
    const cls = await this.classRepository.save({
      name: createClassDto.name,
      subject: [{ id: createClassDto.subjectId }],
      start: createClassDto.dateRange[0],
      end: createClassDto.dateRange[1],
      active: true,
      size: +createClassDto.size,
      teacherId: createClassDto.teacherId,
    });

    createClassDto.schedules.forEach(async (data) => {
      await this.scheduleService.create({
        active: true,
        start: cas[data.caId - 1].start,
        end: cas[data.caId - 1].end,
        ten: '',
        typeId: 1,
        day: data.day,
        roomId: data.roomId,
        classId: cls.id,
      } as Schedule);
    });
    if (createClassDto.teacherId) {
      const noti = new Notification();
      noti.content = JSON.stringify({
        className: createClassDto.name,
        classId: cls.id,
      });
      noti.time = new Date();
      noti.senderId = createClassDto.senderId;
      noti.type = notificationTypeEnum.THEM_LOP;

      const re = new Receiver();
      re.userId = createClassDto.teacherId;
      re.isReaded = false;

      // noti.receivers = [re]
      const n = await this.notificationService.create(noti);

      re.notificationId = n.id;
      this.receiverService.create(re);
    }
    return this.findOne(cls.id);
  }

  async approvedClassByTeacher(createClassDto: CreateClassDto) {
    const cls: any = createClassDto.id;
    createClassDto.schedules.forEach(async (data) => {

      await this.scheduleService.create({
        active: true,
        start: cas[data.caId - 1].start,
        end: cas[data.caId - 1].end,
        ten: '',
        typeId: 1,
        day: data.day,
        roomId: data.roomId,
        classId: cls,
      } as Schedule);
      console.log({
        notificationId: createClassDto.notificationId,
        userId: createClassDto.teacherId,
      });
      
      await this.receiverService.update(
        {
          notificationId: createClassDto.notificationId,
          userId: createClassDto.teacherId,
        },
        { isReaded: true },
      );
    });

    return this.findOne(cls.id);
  }

  findAll() {
    return this.classRepository.find({
      where: { active: true },
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true },
      },
      select: {
        teacher: { fullName: true },
      },
      order: {
        id: 'DESC'
      }
    });
  }

  findOne(id: number) {
    return this.classRepository.findOne({
      where: { active: true, id },
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true },
      },
      select: {
        teacher: { fullName: true },
      },
    });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepository.update({ id }, updateClassDto);
  }

  remove(id: number) {
    return this.classRepository.update({ id }, { active: false });
  }
}
