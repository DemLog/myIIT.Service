import { Column, Entity, ManyToOne } from "typeorm";
import { MediaType } from "../../../common/enums/files/mediaType.enum";
import { News } from "../news/news.entity";
import { File } from "./file.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Media extends File {
  @Column({
    type: 'enum',
    enum: MediaType,
  })
  @ApiProperty({ enum: MediaType, description: 'Тип медиа-файла.' })
  type: MediaType;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Заголовок', description: 'Подпись к медиа-файлу.' })
  caption: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://example.com/thumbnail', description: 'Ссылка на миниатюру медиа-файла.' })
  thumbnail: string;

  @ManyToOne(() => News)
  @ApiProperty({ type: () => News, description: 'Новость, к которой принадлежит медиа-файл.' })
  news: News;
}