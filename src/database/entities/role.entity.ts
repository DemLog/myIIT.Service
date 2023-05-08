import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { RolePermission } from './role-permission.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор роли' })
  id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Название роли' })
  name: string;

  @Column({ name: 'description' })
  @ApiProperty({ description: 'Описание роли' })
  description: string;

  @ManyToMany(() => Profile, (profile) => profile.roles)
  profiles: Profile[];

  @ManyToMany(() => RolePermission, (permission) => permission.roles)
  permissions: RolePermission[];
}