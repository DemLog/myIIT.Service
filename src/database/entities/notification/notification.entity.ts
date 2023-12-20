import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationLevel } from "../../../common/enums/notification/notificationLevel.enum";
import { RecipientType } from "../../../common/enums/notification/recipientType.enum";

@Entity({name: "notification"})
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор уведомления'})
  id: number;

  @Column({ name: 'level', default: NotificationLevel.Info, type: 'enum', enum: NotificationLevel })
  @ApiProperty({
    enum: NotificationLevel,
    default: NotificationLevel.Info,
    description: 'Уровень уведомления'
  })
  level: NotificationLevel;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'Заголовок уведомления' })
  title: string;

  @Column({ name: 'description', nullable: true })
  @ApiProperty({ description: 'Описание уведомления' })
  description: string;

  @Column({ name: 'time' })
  @ApiProperty({ description: 'Время уведомления' })
  time: Date;

  @Column({ name: 'service' })
  @ApiProperty({ description: 'Сервис, от которого пришло уведомление' })
  service: string;

  @Column({ name: 'recipient_type', default: RecipientType.User, type: 'enum', enum: RecipientType })
  @ApiProperty({
    enum: RecipientType,
    default: RecipientType.User,
    description: 'Тип получателя уведомления'
  })
  recipientType: RecipientType;

  @Column({ name: 'recipient_id', nullable: true })
  @ApiProperty({ description: 'Идентификатор получателя (пользователя или группы), если применимо' })
  recipientId: number;
}