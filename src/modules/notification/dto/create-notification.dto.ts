import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { NotificationLevel } from '../../../common/enums/notification/notificationLevel.enum';
import { RecipientType } from '../../../common/enums/notification/recipientType.enum';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty({ example: 'Уведомление', description: 'Заголовок уведомления' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'Описание уведомления', description: 'Описание уведомления' })
  description?: string;

  @IsEnum(NotificationLevel)
  @ApiProperty({ enum: NotificationLevel, default: NotificationLevel.Info, description: 'Уровень уведомления' })
  level: NotificationLevel;

  @IsString()
  @ApiProperty({ example: 'Сервис', description: 'Сервис, от которого пришло уведомление' })
  service: string;

  @IsEnum(RecipientType)
  @ApiProperty({ enum: RecipientType, default: RecipientType.User, description: 'Тип получателя уведомления' })
  recipientType: RecipientType;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'Идентификатор получателя (пользователя или группы), если применимо' })
  recipientId?: number;
}
