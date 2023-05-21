import { ApiProperty } from '@nestjs/swagger';

export class RolePermissionDto {
  @ApiProperty({
    description: 'Идентификатор права доступа роли',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Наименование права доступа роли',
    example: 'edit_users',
  })
  name: string;

  @ApiProperty({
    description: 'Описание права доступа роли',
    example: 'Позволяет редактировать пользователей',
  })
  description: string;
}