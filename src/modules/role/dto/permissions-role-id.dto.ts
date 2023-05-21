import { ApiProperty } from '@nestjs/swagger';

export class PermissionsRoleIdDto {
  @ApiProperty({
    description: 'Массив идентификаторов разрешений',
    type: [Number],
    example: [1, 2, 3],
  })
  permissionsId: number[];
}