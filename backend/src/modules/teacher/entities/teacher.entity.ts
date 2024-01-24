import { Sign } from 'src/modules/sign/entities/sign.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  IntegerType,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'giaoVien' })
export class Teacher {
  @PrimaryColumn()
  userId: IntegerType;

  @ManyToOne(() => User, (user) => user.teacherInfo)
  user: User;

  @OneToMany(() => Sign, (sign) => sign.teacher)
  signs?: Sign[];

  @Column({ name: 'namKinhNgiem' })
  exYear: number;

  @Column({ name: 'bangCap' })
  degree: string;

  @Column({ name: 'boMon' })
  subject: string;

  @Column({name: 'active'})
  active: boolean
}
