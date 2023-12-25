import { IsNotEmpty, IsMimeType } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPhotoChatDto {
  @ApiProperty({ type: 'string', format: 'binary', description: "Файл аватара беседы" })
  @IsNotEmpty()
  @IsMimeType()
  file: any;
}