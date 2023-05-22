import { ApiProperty } from '@nestjs/swagger';
import { SubjectType } from "../../../../common/enums/subjectType.enum";

export class CreateSubjectDto {
  @ApiProperty({name: "Название предмета"})
  title: string;

  @ApiProperty({ name: "Тип проведения предмета", enum: SubjectType, default: SubjectType.Unknown })
  type: SubjectType;
}