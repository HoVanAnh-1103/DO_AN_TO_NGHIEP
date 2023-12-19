import { Category } from "src/modules/category/entities/category.entity";
import { Class } from "src/modules/class/entities/class.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "monHoc" })
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "ten" })
    name: string
    @Column({ name: "moTa", nullable: true })
    description: string;
    @Column({ name: 'trangThai', default: true })
    active: boolean

    @ManyToOne(() => Category, (category) => category.subjects, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "monHocId" })
    category: Category

    @OneToMany(() => Class, cls => cls.subject)
    classes: Class[]
}
