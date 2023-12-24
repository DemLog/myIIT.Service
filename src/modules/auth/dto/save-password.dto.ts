import { ApiProperty } from '@nestjs/swagger';

export class SavePasswordDto {
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

    @ApiProperty({
        description: 'PIN-Code',
        example: 1324,
    })
    pinCode: number;
}