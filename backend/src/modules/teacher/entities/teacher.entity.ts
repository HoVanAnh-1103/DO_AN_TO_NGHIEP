import { User } from "src/modules/user/entities/user.entity";
import { Entity, IntegerType, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: "giaoVien"})
export class Teacher {
    @PrimaryColumn()
    userId: IntegerType;

    @ManyToOne(()=>User,(user)=>user.teacherInfo)
    user: User
}
