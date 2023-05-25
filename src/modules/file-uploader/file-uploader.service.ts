import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "../../database/entities/Files/file.entity";
import { Repository } from "typeorm";
import { Media } from "../../database/entities/Files/media.entity";
import { Express } from 'express'
import { Profile } from "../../database/entities/users/profile.entity";
import { MediaType } from "../../common/enums/files/mediaType.enum";

@Injectable()
export class FileUploaderService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>
  ) {}

  async uploadFile(file: Express.Multer.File, author?: Profile): Promise<File> {
    const savedFile = this.fileRepository.create({
      url: 'uploads/' + file.filename,
      filename: file.filename,
      fileType: file.mimetype,
      fileSize: file.size,
      author: author || null
    });
    return this.fileRepository.save(savedFile);
  }

  async uploadMedia(file: Express.Multer.File, createMediaDto: Partial<Media>, author?: Profile): Promise<Media> {
    const savedFile = await this.uploadFile(file, author || null);
    createMediaDto.type = this.getMediaTypeByFileExtension(file.filename);

    const savedMediaFile = this.mediaRepository.create({
      ...savedFile,
      ...createMediaDto
    })
    return this.mediaRepository.save(savedMediaFile);
  }

  private getMediaTypeByFileExtension(filename: string): MediaType {
    const extension = filename.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return MediaType.Image;
    }

    if (['mp4', 'avi', 'mkv'].includes(extension)) {
      return MediaType.Video;
    }

    if (['mp3', 'wav'].includes(extension)) {
      return MediaType.Audio;
    }

    throw new HttpException("Требуемый тип несоотвествует допустимым типам для медиа-файла", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
