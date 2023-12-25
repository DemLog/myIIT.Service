import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "src/common/enums/events/eventType.enum";
import { CreateAttachmentDto } from "src/modules/file-uploader/dto/create-attachment.dto";

export class ResponseEventVoteDto {
    @ApiProperty({ description: 'Статус' })
    status: boolean;

    @ApiProperty({ description: 'ID мероприятия' })
    event: number;
}