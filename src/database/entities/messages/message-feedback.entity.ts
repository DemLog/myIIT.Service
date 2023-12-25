import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from "../profile/profile.entity";
import { Message } from "./message.entity";

@Entity({ name: 'message_feedback' })
export class MessageFeedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор диалога обратной связи' })
  id: number;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "from_profile_id" })
  @ApiProperty({ type: () => Profile, description: 'ID создателя тикета' })
  fromId: Profile;

  @CreateDateColumn({ name: 'date' })
  @ApiProperty({ description: 'Время создания заявки', type: () => Date })
  date: Date;

  @Column({ name: 'is_active', default: true })
  @ApiProperty({ description: 'Статус заявки' })
  isActive: boolean;

  @OneToOne(() => Message, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: "last_message_id" })
  @ApiProperty({ type: () => Message, description: 'ID последнего сообщения' })
  lastMessage: Message;

  @Column({ name: 'secret' })
  @ApiProperty({ description: 'Уникальный токен заявки обратной связи' })
  secret: string;
}