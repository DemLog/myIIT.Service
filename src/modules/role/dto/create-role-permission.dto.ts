import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({
    description: 'Название разрешения',
    example: 'create:user',
  })
  name: string;

  @ApiProperty({
    description: 'Описание разрешения',
    example: 'Позволяет создавать новых пользователей',
  })
  description: string;
}