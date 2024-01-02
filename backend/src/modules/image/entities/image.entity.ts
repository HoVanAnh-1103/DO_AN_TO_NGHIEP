import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCloud: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  thumbUrl: string;

  @Column()
  mediumUrl: string;

  @Column()
  deleteUrl: string;
}
