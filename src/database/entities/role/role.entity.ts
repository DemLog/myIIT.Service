import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { RolePermission } from './role-permission.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор роли' })
  id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Название роли' })
  name: string;

  @Column({ name: 'description', nullable: true })
  @ApiProperty({ description: 'Описание роли' })
  description: string;

  @ManyToMany(() => RolePermission)
  @JoinTable()
  @ApiProperty({ description: 'Разрешения у роли', type: () => [RolePermission] })
  permissions: RolePermission[];
}