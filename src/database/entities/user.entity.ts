import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "./profile.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  @ApiProperty({ description: 'Уникальный идентификатор пользователя' })
  id: number;

  @Column({ name: "login", unique: true })
  @ApiProperty({ description: 'Логин пользователя' })
  login: string;

  @Column({ name: "password", select: false, nullable: true })
  @ApiProperty({ description: 'Хеш пароля пользователя' })
  password: string;

  @Column({ name: "moodle_consent", default: false })
  @ApiProperty({ description: 'Согласие на хранение пароля в базе' })
  moodleConsent: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "profile_id" })
  @ApiProperty({ description: 'Профиль пользователя', type: () => Profile })
  profile: Profile;
}