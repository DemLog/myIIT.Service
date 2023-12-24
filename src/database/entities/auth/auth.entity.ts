import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, BaseEntity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "../profile/profile.entity";

@Entity({ name: "auth" })
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @ApiProperty({ description: 'Уникальный идентификатор пользователя' })
  id: number;

  @Column({ name: "login", unique: true })
  @ApiProperty({ description: 'Логин пользователя' })
  login: string;

  @Column({ name: "password", nullable: true })
  @ApiProperty({ description: 'Хеш пароля пользователя' })
  password: string;

  @Column({ name: "moodle_consent", default: false })
  @ApiProperty({ description: 'Согласие на хранение пароля в базе' })
  moodleConsent: boolean;

  @CreateDateColumn({ name: "create_date", type: 'timestamptz' })
  @ApiProperty({ description: 'Дата создания аккаунта', type: () => Date })
  createDate: Date;

  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "profile_id" })
  @ApiProperty({ description: 'Профиль пользователя', type: () => Profile })
  profile: Profile;

  public toString(): string
  {
    return this.login;
  }
}
