import { Class } from '../entities/class.entity';

export class CreateClassDto extends Class {
  subjectId?: number;
  dateRange?: Date[];
  senderId?: number;
  notificationId?: number;
}
