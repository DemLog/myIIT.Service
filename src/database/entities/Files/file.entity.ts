import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Profile } from "../users/profile.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  filename: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @ManyToOne(() => Profile, {nullable: true})
  @JoinColumn()
  author: Profile;

}