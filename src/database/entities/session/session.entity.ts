import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from "../profile/profile.entity";

@Entity({ name: 'session' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор сессии' })
  id: number;

  @Column({ name: 'device_info', nullable: true })
  @ApiProperty({ description: 'Информация об устройстве, на котором происходит сессия' })
  deviceInfo: string;

  @Column({ name: 'ip_address', nullable: true })
  @ApiProperty({ description: 'IP-адрес, с которого происходит сессия' })
  ipAddress: string;

  @Column({ name: 'token' })
  @ApiProperty({ description: 'JWT-токен, используемый для аутентификации сессии' })
  token: string;

  @CreateDateColumn({ name: "create_date" })
  @ApiProperty({ description: 'Дата создания сессии', type: () => Date })
  createDate: Date;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "profile_id" })
  @ApiProperty({ type: () => Profile, description: 'Профиль пользователя, связанный с сессией' })
  profile: Profile;
}