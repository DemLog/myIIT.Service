import { ApiProperty } from "@nestjs/swagger";
import { CreateMessageDto } from "../message/create-message.dto";

export class SendChannelBroadcastDto {
    @ApiProperty({ description: 'ID каналов' })
    channels: number[];

    @ApiProperty({ description: 'Сообщение' })
    message: Pick<CreateMessageDto, "text" | "attachments">
}