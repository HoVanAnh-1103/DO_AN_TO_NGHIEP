import { Class } from "src/modules/class/entities/class.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "hoten" })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "matKhau" })
  password: string;

  @Column({ unique: true, name: "soDienThoai" })
  phone: string;

  @Column({ default: 0, name: "xacThuc" })
  verify: boolean;

  @Column({ default: 0, name: "hoatDong" })
  activity: boolean;

  @ManyToMany(() => Role, (role) => role.name, {
    cascade: true,
  })
  roles: Role[];

  isAdmin?: boolean;

  @OneToMany(() => Class, (classs) => classs.teacher)
  @JoinTable()
  classes: Class[];

  @Column({ name: "diaChi", nullable: true, })
  address: string

  @Column({name: 'trangTahi', default: true})
  active: boolean
  


  // @ManyToMany(() => Course, (course) => course.lecturers)
  // coursesTaught: Course[];

  // @OneToMany(() => Course, (course) => course.created_by)
  // @JoinTable()
  // ownedCourses: Course[];

  // @OneToOne(() => Image)
  // @JoinColumn()
  // avatar: Image;

  // @OneToMany(() => Cart, (cart) => cart.account)
  // carts: Cart[];

  // // @OneToMany(() => Payment, (payment) => payment.account)
  // // payments?: Payment[];

  // @OneToMany(() => Comment, (comment) => comment.account)
  // comments: Comment[];

  // @OneToOne(() => Learned, (learned) => learned.account) // specify inverse side as a second parameter
  // learned: Learned;

  // @OneToMany(() => TestResult, (testResult) => testResult.account)
  // testResults: TestResult[];

  // @OneToOne(
  //     () => TeacherInfermation,
  //     (teacherInformation) => teacherInformation.account,
  // ) // specify inverse side as a second parameter
  // teacherInformation: TeacherInfermation;
}
