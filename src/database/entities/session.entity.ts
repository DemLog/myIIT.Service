import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile.entity';

@Entity({ name: 'session' })
export class Session {
  // Уникальный идентификатор сессии
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор сессии' })
  id: number;

  // Информация об устройстве, на котором происходит сессия
  @Column({ name: 'device_info' })
  @ApiProperty({ description: 'Информация об устройстве, на котором происходит сессия' })
  deviceInfo: string;

  // IP-адрес, с которого происходит сессия
  @Column({ name: 'ip_address' })
  @ApiProperty({ description: 'IP-адрес, с которого происходит сессия' })
  ipAddress: string;

  // JWT-токен, используемый для аутентификации сессии
  @Column({ name: 'token' })
  @ApiProperty({ description: 'JWT-токен, используемый для аутентификации сессии' })
  token: string;

  // Профиль пользователя, связанный с сессией
  @ManyToOne(() => Profile, (profile) => profile.sessions, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Profile, description: 'Профиль пользователя, связанный с сессией' })
  profile: Profile;
}