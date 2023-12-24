import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { PeerType } from "src/common/enums/messages/peerType.enum";
import { Profile } from "../profile/profile.entity";
import { Attachment } from "../file/attachment.entity";

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор сообщения' })
  id: number;

  @CreateDateColumn({ name: 'date' })
  @ApiProperty({ description: 'Время создания сообщения', type: () => Date })
  date: Date;

  @UpdateDateColumn({ name: 'update_date' })
  @ApiProperty({ description: 'Время обновления сообщения', type: () => Date })
  updateDate: Date;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "from_profile_id" })
  @ApiProperty({ type: () => Profile, description: 'ID отправителя' })
  fromId: Profile;

  @Column({ name: 'text', nullable: true })
  @ApiProperty({ description: 'Техт собщения' })
  text: string;

  @ManyToMany(() => Attachment, { cascade: true })
  @JoinTable()
  @ApiProperty({ type: () => [Attachment], description: 'Вложения' })
  Attachments: Attachment[];

  @ManyToOne(() => Message, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: "reply_message_id" })
  @ApiProperty({ description: 'ID ответного сообщения', type: () => Message })
  replyMessage: Message;

  @Column({ name: 'is_read', default: false })
  @ApiProperty({ description: 'Прочитано сообщение?' })
  isRead: boolean;

  @Column({ name: 'is_deleted', default: false })
  @ApiProperty({ description: 'Удалено сообщение?' })
  deleted: boolean;

  @Column({ name: 'is_edited', default: false })
  @ApiProperty({ description: 'Редактированное сообщение?' })
  edited: boolean;

  @Column({ name: 'peer_type', default: PeerType.Conversation, type: 'enum', enum: PeerType })
  @ApiProperty({
    enum: PeerType,
    default: PeerType.Conversation,
    description: 'Тип диалога'
  })
  peerType: PeerType;

  @Column({ name: 'peer_id' })
  @ApiProperty({ description: 'ID диалога' })
  peerId: number;
}