import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddRoleProfileDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    id: number;
  
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID роли' })
    roleId: number;
  }