import { IsNotEmpty, IsMimeType } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', description: "Файл аватара профиля" })
  @IsNotEmpty()
  @IsMimeType()
  file: any;
}