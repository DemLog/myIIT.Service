import { Media } from "../../../database/entities/Files/media.entity";
import { AggregatorType } from "../../../common/enums/news/aggregatorType.enum";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseNewsAggregatorDto {
  @ApiProperty({ description: 'Идентификатор новостного агрегатора.', example: 1 })
  id: number;

  @ApiProperty({ description: 'Название новостного агрегатора.', example: 'Агрегатор новостей' })
  name: string;

  @ApiProperty({ description: 'Изображение новостного агрегатора.', type: Media })
  image?: Media;

  @ApiProperty({ description: 'URL новостного агрегатора.', example: 'https://example.com' })
  url?: string;

  @ApiProperty({ enum: AggregatorType, description: 'Тип новостного агрегатора.' })
  type: AggregatorType;
}