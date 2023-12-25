import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "../../database/entities/file/file.entity";
import { FileMedia } from "../../database/entities/file/file-media.entity";
import { Attachment } from '../../database/entities/file/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, FileMedia, Attachment])],
  controllers: [],
  providers: [FileUploaderService],
  exports: [FileUploaderService]
})
export class FileUploaderModule {}
