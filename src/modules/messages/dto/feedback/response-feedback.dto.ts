import { ApiProperty } from "@nestjs/swagger";
import { ResponseMessageDto } from "../message/response-message.dto";
import { ProfileMessageDto } from "../profile-message.dto";
import { LastMessageDto } from "../last-message.dto";

export class ResponseFeedbackDto {
  @ApiProperty({ description: 'Идентификатор диалога обратной связи' })
  id: number;

  @ApiProperty({ type: () => ProfileMessageDto, description: 'ID создателя тикета' })
  fromId: ProfileMessageDto;

  @ApiProperty({ description: 'Время создания заявки', type: () => Date })
  date: Date;

  @ApiProperty({ description: 'Статус заявки' })
  isActive: boolean;

  @ApiProperty({ type: () => LastMessageDto, description: 'ID последнего сообщения', nullable: true })
  lastMessage?: LastMessageDto;
}