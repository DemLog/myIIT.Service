import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { AttachmentType } from "src/common/enums/file/attachmentType.enum";
import { File } from "./file.entity";
import { FileMedia } from "./file-media.entity";

@Entity({ name: "attachment" })
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор вложения' })
    id: number;

    @Column({ name: 'type', default: AttachmentType.Other, type: 'enum', enum: AttachmentType })
    @ApiProperty({
        enum: AttachmentType,
        default: AttachmentType.Other,
        description: 'Тип вложения'
    })
    type: AttachmentType;

    @OneToOne(() => File, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: "file_id" })
    @ApiProperty({ description: 'ID файла', type: () => File })
    file: File;

    @OneToOne(() => FileMedia, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: "file_media_id" })
    @ApiProperty({ description: 'ID файла медиа', type: () => FileMedia })
    media: FileMedia;
}