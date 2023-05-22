import { PartialType } from '@nestjs/swagger';
import { CreateTimeScheduleDto } from './create-time-schedule.dto';

export class UpdateTimeScheduleDto extends PartialType(CreateTimeScheduleDto) {}