import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "src/common/enums/events/eventType.enum";
import { CreateAttachmentDto } from "src/modules/file-uploader/dto/create-attachment.dto";

export class ResponseEventDto {
  @ApiProperty({
    enum: EventType,
    default: EventType.Other,
    description: 'Тип мероприятия'
  })
  type: EventType;

  @ApiProperty({ description: 'Название мероприятия' })
  title: string;

  @ApiProperty({ description: 'Описание мероприятия'})
  description: string;

  @ApiProperty({ description: 'Ссылка на мероприятие' })
  url: string;

//   @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true, required: false })
//   attachments?: CreateAttachmentDto[];

  @ApiProperty({ description: 'Время начала мероприятия', type: () => Date })
  date: Date;

  @ApiProperty({ description: 'Фотография мероприятия' })
  photo: string;

  @ApiProperty({ description: 'Местоположение мероприятия' })
  geo: string;

  @ApiProperty({ description: 'Адрес мероприятия' })
  geoName: string;
}