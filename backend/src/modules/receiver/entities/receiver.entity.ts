import { Notification } from "src/modules/notification/entities/notification.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "nguoiNhan" })
export class Receiver {
    // @PrimaryGeneratedColumn()
    // id: number

    @Column({ name: 'thongBaoId' })
    @PrimaryColumn({ name: 'thongBaoId' })
    notificationId: number

    @Column({ name: 'nguoiDungId' })
    @PrimaryColumn({ name: 'nguoiDungId' })

    userId: number

    @ManyToOne(() => User, (user) => user.receivers)
    @JoinColumn({name: 'nguoiDungId'})
    user: User

    @ManyToOne(() => Notification, (user) => user.receivers)
    @JoinColumn({name: 'nguoiDungId'})
    notification: Notification


    @Column({ name: 'daDoc' })
    isReaded: boolean
}
