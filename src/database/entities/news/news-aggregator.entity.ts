import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AggregatorType } from "../../../common/enums/news/aggregatorType.enum";
import { News } from "./news.entity";
import { Media } from "../Files/media.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class NewsAggregator {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор агрегатора новостей.' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Новостной агрегатор', description: 'Название агрегатора новостей.' })
  name: string;

  @OneToOne(() => Media)
  @ApiProperty({ type: Media, description: 'Медиа-файл, связанный с агрегатором новостей.' })
  image: Media;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://example.com', description: 'URL агрегатора новостей.', required: false })
  url: string;

  @Column({
    type: 'enum',
    enum: AggregatorType,
    default: AggregatorType.Internal
  })
  @ApiProperty({ enum: AggregatorType, default: AggregatorType.Internal, description: 'Тип агрегатора новостей.' })
  type: AggregatorType;

  @OneToMany(() => News, news => news.newsAggregator)
  @ApiProperty({ type: [News], description: 'Массив новостей, связанных с агрегатором.' })
  news: News[];
}