import { Column, Entity, ManyToOne } from "typeorm";
import { MediaType } from "../../../common/enums/files/mediaType.enum";
import { News } from "../news/news.entity";
import { File } from "./file.entity";

@Entity()
export class Media extends File{
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