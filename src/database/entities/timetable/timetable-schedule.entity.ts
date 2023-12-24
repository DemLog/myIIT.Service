import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "timetable_schedule"})
export class TimetableSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор времени пары' })
  id: number

  @Column({ name: 'number', nullable: true })
  @ApiProperty({ description: 'Номер пары' })
  number: number

  @Column({ type: 'timestamp', name: 'start_time', nullable: true })
  @ApiProperty({ description: 'Время начала пары' })
  startTime: Date;

  @Column({ type: 'timestamp', name: 'end_time', nullable: true })
  @ApiProperty({ description: 'Время конца пары' })
  endTime: Date;
}