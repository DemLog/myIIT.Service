import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "../../database/entities/file/file.entity";
import { FileMedia } from "../../database/entities/file/file-media.entity";

@Module({
  imports: [TypeOrmModule.forFeature([File, FileMedia])],
  controllers: [],
  providers: [FileUploaderService],
  exports: [FileUploaderService]
})
export class FileUploaderModule {}
