import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) { }
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.save(createNotificationDto);
  }

  findAll() {
    return `This action returns all notification`;
  }

  findAllForTeacher(userId) {
    console.log(userId);
    
    return this.notificationRepository.find({
      where: {
        receivers: {
          userId: userId
        }
      },
      relations:{
        user: true,
        receivers: true
      }
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
