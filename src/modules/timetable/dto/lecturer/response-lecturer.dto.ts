import { PartialType } from '@nestjs/swagger';
import { CreateLecturerDto } from './create-lecturer.dto';

export class ResponseLecturerDto extends PartialType(CreateLecturerDto) {}