import { PartialType } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';

export class ResponseSubjectDto extends PartialType(CreateSubjectDto) {}