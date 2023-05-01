import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'name' })
  @ApiProperty()
  name: string;

  @Column({ name: 'description' })
  @ApiProperty()
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}