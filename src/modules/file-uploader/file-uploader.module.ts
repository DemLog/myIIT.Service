import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "../../database/entities/Files/file.entity";
import { Media } from "../../database/entities/Files/media.entity";

@Module({
  imports: [TypeOrmModule.forFeature([File, Media])],
  controllers: [],
  providers: [FileUploaderService],
  exports: [FileUploaderService]
})
export class FileUploaderModule {}
