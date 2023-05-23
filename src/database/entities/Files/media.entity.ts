import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "../../../common/enums/mediaType.enum";
import { News } from "../news/news.entity";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  type: MediaType;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => News)
  news: News;
}