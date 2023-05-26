import { AggregatorType } from "../../../common/enums/news/aggregatorType.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsAggregatorDto {
  @ApiProperty({ required: false, description: 'Идентификатор новостного агрегатора.', example: 1 })
  id?: number;

  @ApiProperty({ description: 'Название новостного агрегатора.', example: 'Агрегатор новостей' })
  name: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary', description: 'Изображение новостного агрегатора.' })
  image?: Express.Multer.File;

  @ApiProperty({ required: false, description: 'URL новостного агрегатора.', example: 'https://example.com' })
  url?: string;

  @ApiProperty({ enum: AggregatorType, default: AggregatorType.Internal, description: 'Тип новостного агрегатора.' })
  type: AggregatorType;
}