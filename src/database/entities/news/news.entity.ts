import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../Files/media.entity";
import { NewsAggregator } from "./news-aggregator.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор новости.' })
  id: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-05-18T10:30:00.000Z', description: 'Дата и время создания новости.' })
  date: Date;

  @Column()
  @ApiProperty({ example: 'Lorem ipsum', description: 'Содержание сообщения новости.' })
  message: string;

  @OneToMany(() => Media, media => media.news, { nullable: true })
  @JoinColumn()
  @ApiProperty({ type: [Media], description: 'Массив медиа-файлов, связанных с новостью.', required: false })
  media: Media[];

  @Column({ nullable: true })
  @ApiProperty({ example: 100, description: 'Количество просмотров новости.', required: false })
  views: number;

  @ManyToOne(() => NewsAggregator, newsAggregator => newsAggregator.news)
  @JoinColumn()
  @ApiProperty({ type: () => NewsAggregator, description: 'Агрегатор новостей, к которому относится новость.' })
  newsAggregator: NewsAggregator;
}