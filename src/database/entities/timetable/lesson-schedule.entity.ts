import { Subject } from "./subject.entity";
import { Role } from "../users/role.entity";
import { Lecturer } from "./lecturer.entity";
import { DayWeek } from "../../../common/enums/timetable/dayWeek.enum";
import { TimeSchedule } from "./time-schedule.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class LessonSchedule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор занятия' })
  id: number;

  @ManyToOne(() => Subject)
  @JoinColumn()
  @ApiProperty({ description: 'Название предмета', type: () => Subject })
  subject: Subject;

  @ManyToMany(() => Role)
  @JoinTable()
  @ApiProperty({ description: 'Учебные группы', type: () => [Role] })
  groups: Role[];

  @Column({name: "is_even_week", default: false})
  @ApiProperty({ description: 'Четная или нечетная учебная неделя', default: false })
  isEvenWeek: boolean;

  @ManyToMany(() => Lecturer)
  @JoinTable()
  @ApiProperty({ description: 'Преподаватели', type: () => [Lecturer] })
  lecture: Lecturer[];

  @Column({name: "cabinet", nullable: true})
  @ApiProperty({ description: 'Кабинет' })
  cabinet: string;

  @Column({name: "day_week", default: DayWeek.Monday})
  @ApiProperty({ description: 'День недели', enum: DayWeek, default: DayWeek.Monday })
  dayWeek: DayWeek;

  @ManyToOne(() => TimeSchedule)
  @JoinColumn()
  @ApiProperty({ description: 'Время занятия', type: () => TimeSchedule })
  time: TimeSchedule;
}