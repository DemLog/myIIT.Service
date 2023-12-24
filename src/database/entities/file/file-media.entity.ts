import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "../../../common/enums/file/mediaType.enum";
import { ApiProperty } from "@nestjs/swagger";
import { File } from "./file.entity";

@Entity({ name: "file_media" })
export class FileMedia extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор медиа' })
  id: number;

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  @ApiProperty({ enum: MediaType, description: 'Тип медиа-файла' })
  type: MediaType;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Заголовок', description: 'Подпись к медиа-файлу' })
  caption: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://example.com/thumbnail', description: 'Ссылка на миниатюру медиа-файла' })
  thumbnail: string;

  @OneToOne(() => File, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "file_id" })
  @ApiProperty({ description: 'ID файла', type: () => File })
  fileId: File;
}