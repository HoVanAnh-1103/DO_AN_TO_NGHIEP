import { Subject } from "src/modules/subject/entities/subject.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "danhMuc" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "ten" })
    name: string;

    @Column({ name: 'moTa' })
    description: string;

    @Column({ name: "trangThai" })
    active: boolean

    @OneToMany(() => Subject, (subject) => subject.category)
    subjects: Subject[]
}
