import { Sign } from "src/modules/sign/entities/sign.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, IntegerType, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: "giaoVien"})
export class Teacher {
    @PrimaryColumn()
    userId: IntegerType;

    @ManyToOne(()=>User,(user)=>user.teacherInfo)
    user: User

    @OneToMany(() => Sign, (sign) => sign.teacher)
    signs?: Sign[]
}
