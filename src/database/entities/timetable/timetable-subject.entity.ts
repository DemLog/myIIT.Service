import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SubjectType } from "../../../common/enums/timetable/subjectType.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "timetable_subject"})
export class TimetableSubject extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор учебного предмета' })
  id: number;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'Название предмета' })
  title: string;

  @Column({ name: 'type', default: SubjectType.Unknown })
  @ApiProperty({
    enum: SubjectType,
    default: SubjectType.Unknown,
    description: 'Тип проведения предмета'
  })
  type: SubjectType;
}