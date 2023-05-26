import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
  @ApiProperty({ example: 'Lorem ipsum', description: 'Содержание сообщения новости.' })
  message: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  media: Express.Multer.File[];

  @ApiProperty({ example: 1, description: 'Идентификатор агрегатора новостей.' })
  newsAggregator: number;
}