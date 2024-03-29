import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "../profile/profile.entity";

@Entity({ name: "timetable_lecturer" })
export class TimetableLecturer extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор преподавателя' })
  id: number;

  @Column({ name: 'last_name' })
  @ApiProperty({ description: 'Фамилия преподавателя' })
  lastName: string;

  @Column({ name: 'first_name', nullable: true })
  @ApiProperty({ description: 'Имя преподавателя' })
  firstName: string

  @Column({ name: 'patronymic', nullable: true })
  @ApiProperty({ description: 'Отчество преподавателя' })
  patronymic: string;

  @Column({ name: 'position', nullable: true })
  @ApiProperty({ description: 'Должность' })
  position: string;

  @Column({ name: 'contact', nullable: true })
  @ApiProperty({ description: 'Контакт преподавателя' })
  contact: string;

  @OneToOne(() => Profile, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn()
  @ApiProperty({ description: 'Профиль преподавателя', type: () => Profile })
  profile: Profile;
}