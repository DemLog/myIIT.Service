import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ChatType } from "src/common/enums/messages/chatType.enum";
import { Role } from "../role/role.entity";
import { Profile } from "../profile/profile.entity";

@Entity({ name: 'message_chat' })
export class MessageChat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор диалога беседы' })
  id: number;

  @Column({ name: 'peer_type', default: ChatType.Default, type: 'enum', enum: ChatType })
  @ApiProperty({
    enum: ChatType,
    default: ChatType.Default,
    description: 'Тип беседы'
  })
  type: ChatType;

  @ManyToOne(() => Role, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: "role_id" })
  @ApiProperty({ type: () => Role, description: 'ID учебной группы, если есть' })
  role: Role;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'название беседы' })
  title: string;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "admin_profile_id" })
  @ApiProperty({ type: () => Profile, description: 'ID создателя беседы' })
  adminId: Profile;

  @ManyToMany(() => Profile)
  @JoinTable()
  @ApiProperty({ type: () => [Profile], description: 'Участники беседы' })
  members: Profile[];

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty({ description: 'Ссылка на аватар беседы' })
  avatar: string;

  @Column({ name: 'secret' })
  @ApiProperty({ description: 'Уникальный токен беседы' })
  secret: string;
}