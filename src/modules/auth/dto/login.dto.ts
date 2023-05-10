import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Логин',
    example: 'johndoe',
  })
  login: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'MyStrongPassword123',
  })
  password: string;
}