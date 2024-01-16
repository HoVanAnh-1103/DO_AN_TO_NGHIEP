import { Schedule } from "src/modules/schedule/entities/schedule.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "phong" })
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "ten", nullable: true })
    name?: string

    @Column({ name: 'moTa', nullable: true })
    description?: string

    @Column({ name: 'diaChi', nullable: true })

    address?: string

    @Column({ name: "trangThai", default: true })
    active?: Boolean

    @OneToMany(() => Schedule, (schedule) => schedule.room)
    schedules?: Schedule[]
    @Column({ name: 'soChoNgoi', default: 30, nullable: true })
    size?: number
}
