import { ApiProperty } from "@nestjs/swagger";

export class EditChatDto {
  @ApiProperty({ description: 'Название беседы', nullable: true, required: false })
  title?: string;

  @ApiProperty({ description: 'ID создателя беседы', nullable: true, required: false })
  adminId?: number;
}