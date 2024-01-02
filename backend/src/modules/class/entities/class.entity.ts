import { Schedule } from "src/modules/schedule/entities/schedule.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lop" })
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "ten" })
    name: string

    @ManyToOne(() => User, (user) => user.classes, {
    })
    @JoinColumn({ name: 'giaoVienId' })
    teacher: User

    @Column({ name: "siSo" })
    size: Number

    @OneToMany(() => Schedule, (schedule) => schedule.clases)
    schedules?: Schedule[];

    @Column({ name: "batDau", nullable: true })
    start: Date

    @Column({ name: "ketThuc", nullable: true })
    end: Date

    @Column({ default: true, name: "trangThai" })
    active: Boolean

    @ManyToMany(() => Subject, subject => subject.classes, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({name: 'monHocId'})
    subject: Subject

    @ManyToMany(() => User, (user) => user.classes)
    students: User[];

}
