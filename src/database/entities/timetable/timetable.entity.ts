import { DayWeek } from "../../../common/enums/timetable/dayWeek.enum";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Subgroup } from "src/common/enums/timetable/subgroup.enum";
import { TimetableSubject } from "./timetable-subject.entity";
import { Role } from "../role/role.entity";
import { TimetableLecturer } from "./timetable-lecturer.entity";
import { TimetableSchedule } from "./timetable-schedule.entity";

@Entity({name: "timetable"})
export class Timetable extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор занятия' })
  id: number;

  @ManyToOne(() => TimetableSubject, {onDelete: "CASCADE"})
  @JoinColumn({name: "subject_id"})
  @ApiProperty({ description: 'Название предмета', type: () => TimetableSubject })
  subject: TimetableSubject;

  @ManyToMany(() => Role, {nullable: true})
  @JoinTable()
  @ApiProperty({ description: 'Учебные группы', type: () => [Role] })
  groups: Role[];

  @Column({name: "is_even_week", default: false})
  @ApiProperty({ description: 'Четная или нечетная учебная неделя', default: false })
  isEvenWeek: boolean;

  @ManyToMany(() => TimetableLecturer, {nullable: true})
  @JoinTable()
  @ApiProperty({ description: 'Преподаватели', type: () => [TimetableLecturer] })
  lecture: TimetableLecturer[];

  @Column({name: "cabinet", nullable: true})
  @ApiProperty({ description: 'Кабинет' })
  cabinet: string;

  @Column({name: "day_week", default: DayWeek.Monday})
  @ApiProperty({ description: 'День недели', enum: DayWeek, default: DayWeek.Monday })
  dayWeek: DayWeek;

  @Column({name: "subgroup", default: Subgroup.All})
  @ApiProperty({ description: 'Номер подруппы', enum: Subgroup, default: Subgroup.All })
  subgroup: Subgroup;

  @ManyToOne(() => TimetableSchedule, {onDelete: "CASCADE"})
  @JoinColumn({name: "timetable_schedule_id"})
  @ApiProperty({ description: 'Время занятия', type: () => TimetableSchedule })
  time: TimetableSchedule;
}