import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ChannelType } from "src/common/enums/messages/channelType.enum";
import { Role } from "../role/role.entity";
import { Message } from "./message.entity";

@Entity({ name: 'message_channel' })
export class MessageChannel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор диалога канала' })
  id: number;

  @Column({ name: 'peer_type', type: 'enum', enum: ChannelType })
  @ApiProperty({
    enum: ChannelType,
    description: 'Тип канала'
  })
  type: ChannelType;

  @ManyToOne(() => Role, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: "role_id" })
  @ApiProperty({ type: () => Role, description: 'ID учебной группы, если есть' })
  role: Role;

  @OneToOne(() => Message, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: "last_message_id" })
  @ApiProperty({ type: () => Message, description: 'ID последнего сообщения' })
  lastMessage: Message;

  @Column({ name: 'secret' })
  @ApiProperty({ description: 'Уникальный токен канала' })
  secret: string;
}