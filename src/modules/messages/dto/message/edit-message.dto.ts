import { ApiProperty } from "@nestjs/swagger";
import { CreateAttachmentDto } from "../../../../modules/file-uploader/dto/create-attachment.dto";

export class EditMessageDto {
    @ApiProperty({ description: 'Техт собщения', nullable: true })
    text?: string;

    // @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true })
    // attachments?: CreateAttachmentDto[];

    // @ApiProperty({ description: 'ID ответного сообщения', nullable: true })
    // replyMessage?: number;
}