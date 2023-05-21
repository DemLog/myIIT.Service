import { ApiProperty } from '@nestjs/swagger';
import { RolePermissionDto } from "./role-permission.dto";

export class RoleDto {
  @ApiProperty({
    description: 'Идентификатор роли',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Название роли',
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Администратор системы',
  })
  description: string;

  @ApiProperty({
    type: [RolePermissionDto],
    description: 'Список разрешений, связанных с ролью',
  })
  permissions: RolePermissionDto[];
}