import { ApiProperty } from "@nestjs/swagger";

export class AddUserChatDto {
    @ApiProperty({ description: 'ID беседы' })
    id: number;

    @ApiProperty({ description: 'ID пользователя' })
    userId: number;
}