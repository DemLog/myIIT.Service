import { ApiProperty } from '@nestjs/swagger';
import { SubjectType } from "../../../../common/enums/timetable/subjectType.enum";

export class CreateSubjectDto {
  @ApiProperty({description: "Название предмета"})
  title: string;

  @ApiProperty({ description: "Тип проведения предмета", enum: SubjectType, default: SubjectType.Unknown })
  type: SubjectType;
}