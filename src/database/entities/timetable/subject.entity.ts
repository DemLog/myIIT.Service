import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SubjectType } from "../../../common/enums/subjectType.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "subject"})
export class Subject {
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
    description: 'Тип првоедения предмета'
  })
  type: SubjectType;
}