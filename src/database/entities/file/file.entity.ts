import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity } from "typeorm";
import { Profile } from "../profile/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "file" })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор файла' })
  id: number;

  @Column()
  @ApiProperty({ example: 'https://example.com/file', description: 'URL файла' })
  url: string;

  @Column()
  @ApiProperty({ example: 'file.jpg', description: 'Имя файла' })
  filename: string;

  @Column()
  @ApiProperty({ example: 'image/jpeg', description: 'Тип файла' })
  fileType: string;

  @Column()
  @ApiProperty({ example: 1024, description: 'Размер файла в байтах' })
  fileSize: number;

  @CreateDateColumn({ name: "create_date" })
  @ApiProperty({ description: 'Дата создания файла', type: () => Date })
  createDate: Date;

  @ManyToOne(() => Profile, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "profile_id" })
  @ApiProperty({ type: Profile, description: 'Профиль автора файла' })
  author: Profile;
}