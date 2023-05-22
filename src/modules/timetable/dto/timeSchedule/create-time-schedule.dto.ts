import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeScheduleDto {
  @ApiProperty({description: "Номер пары"})
  number: number;

  @ApiProperty({description: "Время начала пары"})
  startTime: string;

  @ApiProperty({description: "Время конца занятия"})
  endTime: string;
}