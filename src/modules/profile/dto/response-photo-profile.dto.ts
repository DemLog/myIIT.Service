import { ApiProperty } from '@nestjs/swagger';

export class ResponsePhotoProfileDto {
  @ApiProperty({ type: 'string', description: "URL фото на сервере" })
  url: string;

  @ApiProperty({ type: 'number', description: "ID пользователя" })
  profileId: number;
}