import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AggregatorType } from "../../../common/enums/news/aggregatorType.enum";
import { News } from "./news.entity";

@Entity()
export class NewsAggregator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  url: string;

  @Column({
    type: 'enum',
    enum: AggregatorType,
    default: AggregatorType.Internal
  })
  type: AggregatorType;

  @OneToMany(() => News, (news) => news.newsAggregator)
  news: News[];
}