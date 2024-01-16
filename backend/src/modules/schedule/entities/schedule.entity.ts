import { Class } from "src/modules/class/entities/class.entity";
import { Room } from "src/modules/room/entities/room.entity";
import { TypeSchedule } from "src/modules/type-schedule/entities/type-schedule.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lichHoc" })
export class Schedule {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'time', name: 'batDau' })
    start: string;
    @Column({ type: 'time', name: 'ketThuc' })
    end: string


    @ManyToOne(() => Class, (cls) => cls.schedules)
    @JoinColumn({ name: 'lopId' })
    class: Class[]
    @Column({name: 'lopId'})
    classId: number
    @Column({ name: "ten" })
    ten: string

    @ManyToOne(() => TypeSchedule, (type) => type.schedules, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'kieuId' })
    typeId: number

    @Column({ name: "date" })
    day: number

    @Column({ name: 'trangThai', default: true })
    active: boolean

    @ManyToOne(() => Room, (room) => room.schedules, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'roomId' })
    room?: Room
    @Column({ name: 'roomId' })
    roomId?: number
    caId?: number
}
