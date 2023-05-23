import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../Files/media.entity";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromId: string;

  @Column()
  date: number;

  @Column()
  message: string;

  @OneToMany(() => Media, media => media.news, {nullable: true})
  @JoinColumn()
  media: Media[];

  @Column({ nullable: true })
  views: number;
}
