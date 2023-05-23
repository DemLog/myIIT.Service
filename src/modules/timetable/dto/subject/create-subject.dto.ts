import { ApiProperty } from '@nestjs/swagger';
import { SubjectType } from "../../../../common/enums/subjectType.enum";

export class CreateSubjectDto {
  @ApiProperty({description: "Название предмета"})
  title: string;

  @ApiProperty({ description: "Тип проведения предмета", enum: SubjectType, default: SubjectType.Unknown })
  type: SubjectType;
}