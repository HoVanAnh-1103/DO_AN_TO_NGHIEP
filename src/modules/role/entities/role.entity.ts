
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "vaitro"})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, name: "ten" })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
