import { ApiProperty } from '@nestjs/swagger';
import { NotificationLevel } from '../../../common/enums/notification/notificationLevel.enum';
import { RecipientType } from '../../../common/enums/notification/recipientType.enum';

export class ResponseNotificationDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор уведомления' })
    id: number;
  
    @ApiProperty({ example: NotificationLevel.Info, enum: NotificationLevel, description: 'Уровень уведомления' })
    level: NotificationLevel;
  
    @ApiProperty({ example: 'Изменение расписания', description: 'Заголовок уведомления' })
    title: string;
  
    @ApiProperty({ example: 'Замечательно описание', description: 'Описание уведомления', nullable: true })
    description: string;
  
    @ApiProperty({ example: new Date(4345435), description: 'Время уведомления' })
    time: Date;
  
    @ApiProperty({ example: 'timetable', description: 'Сервис, от которого пришло уведомление' })
    service: string;
  
    @ApiProperty({ example: RecipientType.User, enum: RecipientType, description: 'Тип получателя уведомления' })
    recipientType: RecipientType;
  
    @ApiProperty({ example: 1, description: 'Идентификатор получателя (пользователя или группы), если применимо', nullable: true })
    recipientId: number;
}
