import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateSubjectDto } from './create-subject.dto';

export class ResponseSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiProperty({ description: 'Идентификатор роли' })
  id: number;
}