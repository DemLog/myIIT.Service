import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';

@Module({
  controllers: [],
  providers: [FileUploaderService],
  exports: [FileUploaderService]
})
export class FileUploaderModule {}
