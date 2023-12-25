import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Event } from "./event.entity";
import { Profile } from "../profile/profile.entity";

@Entity({ name: 'event_vote' })
export class EventVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор голоса' })
  id: number;

  @Column({ name: 'status' })
  @ApiProperty({ description: 'Статус' })
  status: boolean;

  @ManyToOne(() => Event, (event) => event.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "event_id" })
  @ApiProperty({ type: () => Event, description: 'ID мероприятия' })
  event: Event;

  @OneToOne(() => Profile)
  @JoinColumn({ name: "profile_id" })
  @ApiProperty({ description: 'Профиль пользователя', type: () => Profile })
  profile: Profile;
}