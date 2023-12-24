import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeScheduleDto {
  @ApiProperty({description: "Номер пары"})
  number: number;

  @ApiProperty({description: "Время начала пары", type: Date})
  startTime: Date;

  @ApiProperty({description: "Время конца занятия", type: Date})
  endTime: Date;
}