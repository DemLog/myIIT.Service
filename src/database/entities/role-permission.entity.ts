import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Идентификатор разрешения роли' })
  id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Название разрешения роли' })
  name: string;

  @Column({ name: 'description' })
  @ApiProperty({ description: 'Описание разрешения роли' })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}