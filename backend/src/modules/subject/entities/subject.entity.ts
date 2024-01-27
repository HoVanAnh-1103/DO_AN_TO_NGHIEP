import { Category } from "src/modules/category/entities/category.entity";
import { Class } from "src/modules/class/entities/class.entity";
import { Teacher } from "src/modules/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "monHoc" })
export class Subject {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: "ten" })
    name?: string
    @Column({ name: "moTa", nullable: true })
    description?: string;
    @Column({ name: 'trangThai', default: true })
    active?: boolean

    @ManyToOne(() => Category, (category) => category.subjects, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "danhMucId" })
    category?: Category
    @Column({name: 'danhMucId'})
    categoryId: number
    @OneToMany(() => Class, cls => cls.subject)
    classes?: Class[]

    @Column({name: 'lop'})
    class?: number  

    // @OneToMany(() => Teacher, t => t.subject)
    // techers?: Teacher[]
    
    @ManyToMany(() => Teacher, (question) => question.subject)
    @JoinColumn({name: 'monhocId'})
    techers: Teacher[]
}
