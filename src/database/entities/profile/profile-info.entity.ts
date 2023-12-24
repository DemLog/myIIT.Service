import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from "./profile.entity";

@Entity({ name: 'profile_info' })
export class ProfileInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор описания профиля' })
  id: number;

  @Column({ name: 'status', nullable: true })
  @ApiProperty({ description: 'Статус студента' })
  studyStatus: string;

  @Column({ name: 'study_group', nullable: true })
  @ApiProperty({ description: 'Учебная группа студента' })
  studyGroup: string;

  @Column({ name: 'study_direction', nullable: true })
  @ApiProperty({ description: 'Направление обучения студента' })
  studyDirection: string;

  @Column({ name: 'profile', nullable: true })
  @ApiProperty({ description: 'Профиль обучения студента' })
  studyProfile: string;

  @Column({ name: 'position', nullable: true })
  @ApiProperty({ description: 'Должность сотрудника' })
  position: string;

  @OneToOne(() => Profile, (profile) => profile.profileInfo)
  profile: Profile;
}
