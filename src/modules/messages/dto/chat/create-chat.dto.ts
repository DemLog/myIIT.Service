import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
  @ApiProperty({ description: 'Название беседы' })
  title: string;
}