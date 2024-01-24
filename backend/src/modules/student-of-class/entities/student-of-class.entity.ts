import { Class } from 'src/modules/class/entities/class.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'HocSinh_Lop' })
export class StudentOfClass {


  @Column({ name: 'maNguoiDung',primary: true})
  userId: number;
  @Column({ name: 'maLop',primary: true})
  classId: number;

  @Column({ name: 'trangThai'})
  active: boolean;

  @ManyToOne(() => Class, (cls) => cls.signs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'maLop' })
  class: Class;
  @Column({name: 'dangKyLuc'})
  signedAt: Date


  @ManyToOne(() => User, (user) => user.studentOfClass, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'maNguoiDung' })
  user: User;
}
