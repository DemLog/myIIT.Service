import { ApiProperty } from "@nestjs/swagger";
import { PeerType } from "../../../../common/enums/messages/peerType.enum";
import { CreateAttachmentDto } from "../../../../modules/file-uploader/dto/create-attachment.dto";

export class CreateMessageDto {
  @ApiProperty({ description: 'Техт собщения' })
  text: string;

  @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true, required: false })
  attachments?: CreateAttachmentDto[];

  @ApiProperty({ description: 'ID ответного сообщения', nullable: true, required: false })
  replyMessage?: number;

  @ApiProperty({
    enum: PeerType,
    default: PeerType.Conversation,
    description: 'Тип диалога'
  })
  peerType: PeerType;

  @ApiProperty({ description: 'ID диалога' })
  peerId: number;
}