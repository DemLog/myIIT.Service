import { ApiProperty } from "@nestjs/swagger";

export class ResponseCreateSessionDto {
  @ApiProperty({ description: 'JWT токен, который используется для аутентификации и авторизации на сервере.' })
  token: string;

  @ApiProperty({ description: 'Строка, содержащая информацию о устройстве пользователя, с которого была создана сессия.' })
  deviceInfo: string;

  @ApiProperty({ description: 'IP-адрес устройства, с которого была создана сессия.' })
  ipAddress: string;

  @ApiProperty({ description: 'Идентификатор профиля, с которым была связана созданная сессия.' })
  profileId: number;
}