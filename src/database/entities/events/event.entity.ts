import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from "src/common/enums/events/eventType.enum";
import { Attachment } from "../file/attachment.entity";
import { EventVote } from "./event-vote.entity";

@Entity({ name: 'event' })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор мероприятия' })
  id: number;

  @Column({ name: 'type', default: EventType.Other, type: 'enum', enum: EventType })
  @ApiProperty({
    enum: EventType,
    default: EventType.Other,
    description: 'Тип мероприятия'
  })
  type: EventType;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'Название мероприятия' })
  title: string;

  @Column({ name: 'description', nullable: true })
  @ApiProperty({ description: 'Описание мероприятия' })
  description: string;

  @Column({ name: 'url', nullable: true })
  @ApiProperty({ description: 'Ссылка на мероприятие' })
  url: string;

  // @ManyToMany(() => Attachment, {cascade: true})
  // @JoinTable()
  // @ApiProperty({ type: () => [Attachment], description: 'Вложения' })
  // Attachments: Attachment[];

  @Column({ name: 'date' })
  @ApiProperty({ description: 'Время начала мероприятия', type: () => Date })
  date: Date;

  @CreateDateColumn({ name: "created_date", type: 'timestamptz' })
  @ApiProperty({ description: 'Время создания', type: () => Date })
  createdDate: Date;

  @Column({ name: 'photo', nullable: true })
  @ApiProperty({ description: 'Фотография мероприятия' })
  photo: string;

  @Column({ name: 'geo', nullable: true })
  @ApiProperty({ description: 'Местоположение мероприятия' })
  geo: string;

  @Column({ name: 'geo_name', nullable: true })
  @ApiProperty({ description: 'Адрес мероприятия' })
  geoName: string;

  @OneToMany(() => EventVote, (eventVote) => eventVote.event, { onDelete: "CASCADE" })
  votes: EventVote[];
}