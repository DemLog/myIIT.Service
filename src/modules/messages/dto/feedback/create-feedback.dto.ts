import { ApiProperty } from "@nestjs/swagger";
import { CreateMessageDto } from "../message/create-message.dto";
import { CreateAttachmentDto } from "src/modules/file-uploader/dto/create-attachment.dto";

class ComboMessageFeedback {
    @ApiProperty({ description: 'Техт собщения' })
    text: string;

    @ApiProperty({ type: [CreateAttachmentDto], description: 'Вложения', nullable: true, required: false })
    attachments?: CreateAttachmentDto[];
}

export class CreateFeedbackDto {
    @ApiProperty({ description: 'Сообщение', type: ComboMessageFeedback })
    message: ComboMessageFeedback;
}