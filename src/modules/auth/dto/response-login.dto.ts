import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({
    description: 'JWT-токен для авторизации пользователя',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;

  @ApiProperty({
    description: 'Флаг согласия пользователя на сохранение пароля',
    example: true,
  })
  moodleConsent: boolean;

  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: 123,
  })
  userId: number;
}
