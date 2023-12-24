import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role_permission' })
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор разрешения роли' })
  id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Название разрешения роли' })
  name: string;

  @Column({ name: 'description', nullable: true })
  @ApiProperty({ description: 'Описание разрешения роли' })
  description: string;
}