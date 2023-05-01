import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { RolePermission } from './role-permission.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'name' })
  @ApiProperty()
  name: string;

  @Column({ name: 'description' })
  @ApiProperty()
  description: string;

  @ManyToMany(() => Profile, (profile) => profile.roles)
  users: Profile[];

  @ManyToMany(() => RolePermission, (permission) => permission.roles)
  permissions: RolePermission[];
}