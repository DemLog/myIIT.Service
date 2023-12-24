import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Event } from "./event.entity";

@Entity({ name: 'event_vote' })
export class EventVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор голоса' })
  id: number;

  @Column({ name: 'status' })
  @ApiProperty({ description: 'Статус' })
  status: boolean;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "event_id" })
  @ApiProperty({ type: () => Event, description: 'ID мероприятия' })
  event: Event;
}