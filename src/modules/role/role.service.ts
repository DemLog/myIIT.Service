import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../../database/entities/role.entity";
import { Repository } from "typeorm";
import { RolePermission } from "../../database/entities/role-permission.entity";
import { ProfileService } from "../profile/profile.service";
import { CreateRolePermissionDto } from "./dto/create-role-permission.dto";
import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleDto } from "./dto/role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { PermissionsRoleIdDto } from "./dto/permissions-role-id.dto";
import { RoleListDto } from "./dto/role-list.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    private readonly profileService: ProfileService
  ) {
  }

  // Методы по работе с ролевыми привелегиями
  async createRolePermission(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionDto> {
    const rolePermission = this.rolePermissionRepository.create(createRolePermissionDto);
    return this.rolePermissionRepository.save(rolePermission);
  }

  async getRolePermission(id: number): Promise<RolePermission> {
    return await this.rolePermissionRepository.findOneOrFail({where: {id}});
  }

  async findRolePermissionById(id: number): Promise<RolePermissionDto> {
    const rolePermission = this.rolePermissionRepository.findOne({ where: { id } });
    if (!rolePermission) {
      throw new HttpException("Привелегия не найдена", HttpStatus.NOT_FOUND);
    }
    return rolePermission;
  }

  async findRolePermissionByName(name: string): Promise<RolePermissionDto> {
    const rolePermission = this.rolePermissionRepository.findOne({ where: { name } });
    if (!rolePermission) {
      throw new HttpException("Привелегия не найдена", HttpStatus.NOT_FOUND);
    }
    return rolePermission;
  }

  async getAllRolePermissions(): Promise<RolePermissionDto[]> {
    return this.rolePermissionRepository.find();
  }

  async deleteRolePermission(id: number): Promise<void> {
    await this.rolePermissionRepository.delete(id);
  }

  // Методы по работе с ролями
  async createRole(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async getRole(id: number): Promise<Role> {
    return await this.roleRepository.findOneOrFail({where: {id}, relations: ["permissions"]});
  }

  async findRoleById(id: number): Promise<RoleDto> {
    const role = await this.getRole(id);
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async findRoleByName(name: string): Promise<RoleDto> {
    const role = await this.roleRepository.findOneOrFail({where: {name}, relations: ["permissions"]});
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async getAllRoles(): Promise<RoleListDto[]> {
    return this.roleRepository.find();
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async addRolePermission(roleId: number, addPermissionsRoleDto: PermissionsRoleIdDto): Promise<RoleDto> {
    const role = await this.getRole(roleId);
    const permission = await Promise.all(addPermissionsRoleDto.permissionsId.map(id => this.getRolePermission(id)));
    role.permissions.push(...permission);
    return this.roleRepository.save(role);
  }

  async addProfileToRole(roleId: number, profileId: number): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ["profiles"] });
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    const profile = await this.profileService.getProfile(profileId);

    role.profiles.push(profile);
    profile.roles.push(role);
    await this.roleRepository.save(role);
    await this.profileService.update(profileId, profile);
  }

  async removeRolePermissionFromRole(roleId: number, removePermissionsRoleDto: PermissionsRoleIdDto): Promise<RoleDto> {
    const role = await this.getRole(roleId);
    role.permissions = role.permissions.filter(p => !removePermissionsRoleDto.permissionsId.includes(p.id));
    return this.roleRepository.save(role);
  }

  async removeProfileFromRole(roleId: number, profileId: number): Promise<void> {
    const role = await this.getRole(roleId);
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    const profile = await this.profileService.getProfile(profileId);
    role.profiles = role.profiles.filter((p) => p.id !== profileId);
    profile.roles = profile.roles.filter((r) => r.id !== roleId);
    await this.roleRepository.save(role);
    await this.profileService.update(profileId, profile);
  }
}
