import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "./profile.entity";

@Entity({ name: "user" })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ApiProperty()
  @Column({ name: "login", unique: true })
  login: string;

  @ApiProperty()
  @Column({ name: "password", select: false, nullable: true })
  password: string;

  @ApiProperty()
  @Column({ name: "moodle_consent", default: false })
  moodleConsent: boolean;

  @ApiProperty({ type: () => Profile })
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: "profile_id" })
  profile: Profile;
}