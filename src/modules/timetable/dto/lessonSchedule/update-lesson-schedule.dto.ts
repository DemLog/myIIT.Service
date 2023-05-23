import { PartialType } from '@nestjs/swagger';
import { CreateLessonScheduleDto } from "./create-lesson-schedule.dto";

export class UpdateLessonScheduleDto extends PartialType(CreateLessonScheduleDto) {}