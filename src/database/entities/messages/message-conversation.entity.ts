import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from "../profile/profile.entity";

@Entity({ name: 'message_conversation' })
export class MessageConversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор диалога личных сообщений' })
  id: number;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "from_profile_id" })
  @ApiProperty({ type: () => Profile, description: 'ID создателя диалога' })
  fromId: Profile;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "peer_profile_id" })
  @ApiProperty({ type: () => Profile, description: 'ID связанного пользователя с диалогом' })
  peerId: Profile;

  @Column({ name: 'secret' })
  @ApiProperty({ description: 'Уникальный токен диалога' })
  secret: string;
}