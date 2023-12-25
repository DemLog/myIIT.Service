import { ApiProperty } from "@nestjs/swagger";
import { ChannelType } from "src/common/enums/messages/channelType.enum";
import { Role } from "../../../../database/entities/role/role.entity";

export class ResponseChannelDto {
    @ApiProperty({ description: 'Идентификатор диалога канала' })
    id: number;

    @ApiProperty({
        enum: ChannelType,
        description: 'Тип канала'
    })
    type: ChannelType;

    @ApiProperty({ type: () => Role, description: 'ID учебной группы, если есть', nullable: true })
    role?: Role;
}