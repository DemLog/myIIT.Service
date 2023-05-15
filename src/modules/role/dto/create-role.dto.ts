import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Название роли',
    example: 'Администратор',
  })
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Роль с полными правами доступа',
  })
  description: string;
}