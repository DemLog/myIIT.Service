import { ApiProperty } from "@nestjs/swagger";

export class ResponseSessionDto {
  @ApiProperty({ description: 'Идентификатор сессии', example: 1 })
  id: number;

  @ApiProperty({ description: 'Информация об устройстве', example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' })
  deviceInfo: string;

  @ApiProperty({ description: 'IP-адрес, с которого была создана сессия', example: '127.0.0.1' })
  ipAddress: string;

  @ApiProperty({ description: 'Идентификатор профиля, с которым связана сессия', example: 1 })
  profileId: number;
}