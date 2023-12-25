import { ApiProperty } from "@nestjs/swagger";
import { ResponseMessageDto } from "../message/response-message.dto";
import { ProfileMessageDto } from "../profile-message.dto";
import { LastMessageDto } from "../last-message.dto";

export class ResponseConversationDto {
  @ApiProperty({ description: 'Идентификатор диалога личных сообщений' })
  id: number;

  @ApiProperty({ type: () => ProfileMessageDto, description: 'ID создателя диалога' })
  fromId: ProfileMessageDto;

  @ApiProperty({ type: () => ProfileMessageDto, description: 'ID связанного пользователя с диалогом' })
  peerId: ProfileMessageDto;

  @ApiProperty({ type: () => LastMessageDto, description: 'ID последнего сообщения', nullable: true })
  lastMessage?: LastMessageDto;
}