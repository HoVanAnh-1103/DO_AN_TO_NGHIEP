import { User } from 'src/modules/user/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';

export class CreateTeacherDto extends User {
  userId?: number;
  subjects : any[]
  subject : any[]
}
