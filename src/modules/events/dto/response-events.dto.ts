import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "src/common/enums/events/eventType.enum";
import { CreateAttachmentDto } from "src/modules/file-uploader/dto/create-attachment.dto";

export class ResponseEventsDto {
  @ApiProperty({
    enum: EventType,
    default: EventType.Other,
    description: 'Тип мероприятия'
  })
  type: EventType;

  @ApiProperty({ description: 'Название мероприятия'})
  title: string;

//   @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true, required: false })
//   attachments?: CreateAttachmentDto[];

  @ApiProperty({ description: 'Время начала мероприятия', type: () => Date })
  date: Date;

  @ApiProperty({ description: 'Фотография мероприятия' })
  photo: string;

  @ApiProperty({ description: 'Адрес мероприятия'})
  geoName: string;
}