import { Schedule } from "src/modules/schedule/entities/schedule.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "loaiLichHoc" })
export class TypeSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "ten" })
    name?: string

    @OneToMany(() => Schedule, (schedule) => schedule.typeId)

    schedules?: Schedule[];

    @Column({ name: "trangThai", default: true })
    active?: Boolean
}
