import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
  JoinColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ProfileType } from "../../../common/enums/profileType.enum";
import { Session } from "./session.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор профиля' })
  id: number;

  @Column({ name: 'first_name', nullable: true })
  @ApiProperty({ description: 'Имя пользователя' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  @ApiProperty({ description: 'Фамилия пользователя' })
  lastName: string;

  @Column({ name: 'email', nullable: true })
  @ApiProperty({ description: 'Электронная почта пользователя' })
  email: string;

  @Column({ name: 'country', nullable: true })
  @ApiProperty({ description: 'Страна пользователя' })
  country: string;

  @Column({ name: 'city', nullable: true })
  @ApiProperty({ description: 'Город пользователя' })
  city: string;

  @Column({ name: 'status', nullable: true })
  @ApiProperty({ description: 'Статус пользователя' })
  status: string;

  @Column({ name: 'study_group', nullable: true })
  @ApiProperty({ description: 'Учебная группа пользователя' })
  studyGroup: string;

  @Column({ name: 'study_direction', nullable: true })
  @ApiProperty({ description: 'Направление обучения пользователя' })
  studyDirection: string;

  @Column({ name: 'profile', nullable: true })
  @ApiProperty({ description: 'Профиль обучения пользователя' })
  profile: string;

  @Column({ name: 'patronymic', nullable: true })
  @ApiProperty({ description: 'Отчество пользователя' })
  patronymic: string;

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty({ description: 'Ссылка на аватар пользователя' })
  avatar: string;

  @Column({ name: 'profile_type', default: ProfileType.User })
  @ApiProperty({
    enum: ProfileType,
    default: ProfileType.User,
    description: 'Тип профиля (пользователь, сервис, система)',
  })
  profileType: ProfileType;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Session, (session) => session.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  sessions: Session[];

  @ManyToMany(() => Role, (role) => role.profiles, {cascade: true})
  @JoinTable()
  roles: Role[];
}
