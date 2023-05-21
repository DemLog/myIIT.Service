import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "time_schedule"})
export class TimeSchedule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор времени пары' })
  id: number

  @Column({ name: 'number', nullable: true })
  @ApiProperty({ description: 'Номер пары' })
  number: number

  @Column({ name: 'start_time', nullable: true })
  @ApiProperty({ description: 'Время начала пары' })
  startTime: string;

  @Column({ name: 'end_time', nullable: true })
  @ApiProperty({ description: 'Время конца пары' })
  endTime: string;
}