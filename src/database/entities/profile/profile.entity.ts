import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ProfileType } from "../../../common/enums/profile/profileType.enum";
import { ProfileInfo } from "./profile-info.entity";
import { Role } from "../role/role.entity";

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор профиля' })
  id: number;

  @Column({ name: 'first_name', nullable: true })
  @ApiProperty({ description: 'Имя пользователя' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  @ApiProperty({ description: 'Фамилия пользователя' })
  lastName: string;

  @Column({ name: 'patronymic', nullable: true })
  @ApiProperty({ description: 'Отчество пользователя' })
  patronymic: string;

  @Column({ name: 'email', nullable: true })
  @ApiProperty({ description: 'Электронная почта пользователя' })
  email: string;

  @Column({ name: 'country', nullable: true })
  @ApiProperty({ description: 'Страна пользователя' })
  country: string;

  @Column({ name: 'city', nullable: true })
  @ApiProperty({ description: 'Город пользователя' })
  city: string;

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty({ description: 'Ссылка на аватар пользователя' })
  avatar: string;

  @Column({ name: 'profile_type', default: ProfileType.Student })
  @ApiProperty({
    enum: ProfileType,
    default: ProfileType.Student,
    description: 'Тип профиля (студент, сотрудник, сервисный аккаунт)',
  })
  profileType: ProfileType;

  @OneToOne(() => ProfileInfo, (profileInfo) => profileInfo.profile, { cascade: true, onDelete: 'CASCADE', nullable: true })
  @JoinColumn({name: "profile_info_id"})
  @ApiProperty({ description: 'Дополнительная информация о профиле', type: () => ProfileInfo })
  profileInfo: ProfileInfo;

  @ManyToMany(() => Role, {cascade: true})
  @JoinTable()
  @ApiProperty({ description: 'Роли пользователя', type: () => [Role] })
  roles: Role[];
}
