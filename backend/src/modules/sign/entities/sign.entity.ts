import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { SignUpClassStatus } from "src/modules/auth/guards/role.enum";
import { Class } from "src/modules/class/entities/class.entity";
import { Teacher } from "src/modules/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'DangKyLop' })
export class Sign {
    // @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'dangKyLuc', nullable: true })
    signedAt: Date

    @Column({ name: 'capNhatLuc', nullable: true })
    updatedAt: Date
    @PrimaryColumn({ name: 'lopId' })
    // @Column({name: 'lopId'})
    classId: number

    // @Column({name: 'giaoVienId'})
    @PrimaryColumn({ name: 'giaoVienId' })

    teacherId: number;

    @ManyToOne(() => Class, (cls) => cls.signs, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'lopId' })
    class: Class


    @ManyToOne(() => Teacher, (t) => t.signs, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'giaoVienId' })
    teacher: Teacher

    @Column({ name: 'trangThai', default: true })
    active: boolean
    @Column({ name: 'trangThaiDangKy', type: 'enum', enum: SignUpClassStatus })
    status: string
}
