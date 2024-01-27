import { Receiver } from "src/modules/receiver/entities/receiver.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum notificationTypeEnum {
    'THEM_LOP' = 'THEM_LOP'
}

@Entity({ name: "thongbao" }

)
export class Notification {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ name: 'noiDung' })
    content: string

    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({name: 'nguoiGui'})
    user: User



    @Column({ name: 'nguoiGui' })
    senderId: number

    @Column({ name: 'loaiThongBao', type: 'enum', enum: notificationTypeEnum })
    type: string

    @Column({ name: 'thoiGian' })
    time: Date

    @OneToMany(() => Receiver, (r) => r.notification)
    receivers?: Receiver[]
}
