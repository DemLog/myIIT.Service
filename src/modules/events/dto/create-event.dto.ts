import { ApiProperty } from "@nestjs/swagger";
import { IsMimeType } from "class-validator";
import { EventType } from "src/common/enums/events/eventType.enum";
import { CreateAttachmentDto } from "src/modules/file-uploader/dto/create-attachment.dto";

export class CreateEventDto {
  @ApiProperty({
    enum: EventType,
    default: EventType.Other,
    description: 'Тип мероприятия'
  })
  type: EventType;

  @ApiProperty({ description: 'Название мероприятия' })
  title: string;

  @ApiProperty({ description: 'Описание мероприятия', required: false })
  description?: string;

  @ApiProperty({ description: 'Ссылка на мероприятие', required: false })
  url?: string;

//   @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true, required: false })
//   attachments?: CreateAttachmentDto[];

  @ApiProperty({ description: 'Время начала мероприятия', type: () => Date })
  date: Date;

  @ApiProperty({ description: 'Фотография мероприятия', required: false })
  photo?: string;

  @ApiProperty({ description: 'Местоположение мероприятия', required: false })
  geo?: string;

  @ApiProperty({ description: 'Адрес мероприятия', required: false })
  geoName?: string;

  @ApiProperty({ type: 'string', format: 'binary', description: "Файл аватара профиля", required: false })
  @IsMimeType()
  file?: any;
}