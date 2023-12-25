import { ApiProperty } from "@nestjs/swagger";
import { PeerType } from "../../../../common/enums/messages/peerType.enum";
import { Profile } from "../../../../database/entities/profile/profile.entity";
import { ResponseAttachmentDto } from "../../../../modules/file-uploader/dto/response-attachment.dto";
import { ProfileMessageDto } from "../profile-message.dto";
import { LastMessageDto } from "../last-message.dto";

export class ResponseMessageDto {
  @ApiProperty({ description: 'Идентификатор сообщения' })
  id: number;

  @ApiProperty({ description: 'Время создания сообщения', type: Date })
  date: Date;

  @ApiProperty({ description: 'Время обновления сообщения', type: Date, nullable: true })
  updateDate?: Date;

  @ApiProperty({ type: () => ProfileMessageDto, description: 'ID отправителя' })
  fromId: ProfileMessageDto;

  @ApiProperty({ description: 'Техт собщения' })
  text: string;

  @ApiProperty({ type: [ResponseAttachmentDto], description: 'Вложения', nullable: true })
  attachments?: ResponseAttachmentDto[];

  @ApiProperty({ description: 'ID ответного сообщения', type: LastMessageDto, nullable: true })
  replyMessage?: LastMessageDto;

  @ApiProperty({ description: 'Прочитано сообщение?' })
  isRead: boolean;

  @ApiProperty({ description: 'Удалено сообщение?' })
  deleted: boolean;

  @ApiProperty({ description: 'Редактированное сообщение?' })
  edited: boolean;

  @ApiProperty({
    enum: PeerType,
    default: PeerType.Conversation,
    description: 'Тип диалога'
  })
  peerType: PeerType;

  @ApiProperty({ description: 'ID диалога' })
  peerId: number;
}