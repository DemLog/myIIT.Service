import { ApiProperty } from "@nestjs/swagger";
import { PeerType } from "../../../common/enums/messages/peerType.enum";

export class QueryHistoryMessageDto {
    @ApiProperty({
        enum: PeerType,
        default: PeerType.Conversation,
        description: 'Тип диалога'
    })
    peerType: PeerType;

    @ApiProperty({ description: 'ID диалога' })
    peerId: number;
}