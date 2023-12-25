import { ApiProperty } from "@nestjs/swagger";
import { ProfileMessageDto } from "./profile-message.dto";

export class LastMessageDto {
    @ApiProperty({ description: 'Идентификатор сообщения' })
    id: number;
  
    @ApiProperty({ description: 'Время создания сообщения', type: Date })
    date: Date;
  
    @ApiProperty({ type: () => ProfileMessageDto, description: 'ID отправителя' })
    fromId: ProfileMessageDto;
  
    @ApiProperty({ description: 'Техт собщения' })
    text: string;
  
    @ApiProperty({ description: 'Прочитано сообщение?' })
    isRead: boolean;
  }