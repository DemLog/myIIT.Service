import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTimeScheduleDto } from './create-time-schedule.dto';

export class ResponseTimeScheduleDto extends PartialType(CreateTimeScheduleDto) {
  @ApiProperty({ description: 'Идентификатор времени' })
  id: number;
}