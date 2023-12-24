import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MediaType } from "../../common/enums/file/mediaType.enum";
import * as uuid from 'uuid';
import * as path from "path";
import * as fs from "fs";
import { Profile } from "../../database/entities/profile/profile.entity";
import { File } from "../../database/entities/file/file.entity";
import { FileMedia } from "../../database/entities/file/file-media.entity";
import { CreateFileMediaDto } from "./dto/create-file-media.dto";

@Injectable()
export class FileUploaderService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(FileMedia)
    private readonly mediaRepository: Repository<FileMedia>
  ) {}

  async uploadFile(file: Express.Multer.File, author?: Profile): Promise<File> {
    const { originalname, mimetype, buffer, size } = file;

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = uuid.v4() + '.' + originalname.split('.').pop();

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const savedFile = this.fileRepository.create({
      url: 'uploads/' + fileName,
      filename: fileName,
      fileType: mimetype,
      fileSize: size,
      author: author || null
    });
    return this.fileRepository.save(savedFile);
  }

  async uploadMedia(file: Express.Multer.File, createFileMediaDto: CreateFileMediaDto, author?: Profile): Promise<File> {
    const savedFile = await this.uploadFile(file, author || null);
    const type = this.getMediaTypeByFileExtension(savedFile.filename);

    const savedMediaFile = this.mediaRepository.create({
      ...savedFile,
      ...createFileMediaDto,
      type
    })
    await this.mediaRepository.save(savedMediaFile);
    return savedFile;
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
