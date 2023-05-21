import { ApiProperty } from "@nestjs/swagger";

export class RoleIdDto {
  @ApiProperty({ example: '1', description: 'Индентификатор роли' })
  roleId: number;
}