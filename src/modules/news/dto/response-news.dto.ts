import { ApiProperty } from '@nestjs/swagger';
import { Media } from '../../../database/entities/Files/media.entity';
import { ResponseNewsAggregatorDto } from "./response-news-aggregator.dto";

export class ResponseNewsDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор новости.' })
  id: number;

  @ApiProperty({ example: '2023-05-18T10:30:00.000Z', description: 'Дата и время создания новости.' })
  date: Date;

  @ApiProperty({ example: 'Lorem ipsum', description: 'Содержание сообщения новости.' })
  message: string;

  @ApiProperty({ type: [Media], description: 'Массив медиа-файлов, связанных с новостью.' })
  media: Media[];

  @ApiProperty({ example: 100, description: 'Количество просмотров новости.', required: false })
  views: number;

  @ApiProperty({ type: ResponseNewsAggregatorDto, description: 'Агрегатор новостей.' })
  newsAggregator: ResponseNewsAggregatorDto;
}