import { ApiProperty } from "@nestjs/swagger";
import { ChatType } from "../../../../common/enums/messages/chatType.enum";
import { ResponseMessageDto } from "../message/response-message.dto";
import { ProfileMessageDto } from "../profile-message.dto";
import { LastMessageDto } from "../last-message.dto";

export class ResponseChatDto {
  @ApiProperty({ description: 'Идентификатор диалога беседы' })
  id: number;

  @ApiProperty({
    enum: ChatType,
    default: ChatType.Default,
    description: 'Тип беседы'
  })
  type: ChatType;

  @ApiProperty({ description: 'Название беседы' })
  title: string;

  @ApiProperty({ type: () => ProfileMessageDto, description: 'ID создателя беседы', nullable: true })
  adminId?: ProfileMessageDto;

  @ApiProperty({ type: () => [ProfileMessageDto], description: 'Участники беседы' })
  members: ProfileMessageDto[];

  @ApiProperty({ description: 'Ссылка на аватар беседы', nullable: true })
  avatar?: string;

  @ApiProperty({ type: () => LastMessageDto, description: 'ID последнего сообщения', nullable: true })
  lastMessage?: LastMessageDto;
}