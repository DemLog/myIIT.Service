import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Profile } from "../users/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор файла.' })
  id: number;

  @Column()
  @ApiProperty({ example: 'https://example.com/file', description: 'URL файла.' })
  url: string;

  @Column()
  @ApiProperty({ example: 'file.jpg', description: 'Имя файла.' })
  filename: string;

  @Column()
  @ApiProperty({ example: 'image/jpeg', description: 'Тип файла.' })
  fileType: string;

  @Column()
  @ApiProperty({ example: 1024, description: 'Размер файла в байтах.' })
  fileSize: number;

  @ManyToOne(() => Profile, { nullable: true })
  @JoinColumn()
  @ApiProperty({ type: Profile, description: 'Профиль автора файла.' })
  author: Profile;
}