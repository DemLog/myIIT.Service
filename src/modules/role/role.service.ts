import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRolePermissionDto } from "./dto/create-role-permission.dto";
import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleDto } from "./dto/role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { PermissionsRoleIdDto } from "./dto/permissions-role-id.dto";
import { RoleListDto } from "./dto/role-list.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Role } from "../../database/entities/role/role.entity";
import { RolePermission } from "../../database/entities/role/role-permission.entity";
import { PermissionApp } from "../../common/enums/role/permission.enum";
import { EditRoleDto } from "./dto/edit-role.dto";
import { EditRolePermissionDto } from "./dto/edit-role-permission.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  // Методы по работе с ролевыми привелегиями
  async getRolePermission(id: number): Promise<RolePermission> {
    const rolePermission = this.rolePermissionRepository.findOne({ where: { id } });
    if (!rolePermission) {
      throw new HttpException("Привелегия не найдена", HttpStatus.NOT_FOUND);
    }
    return rolePermission;
  }

  async createRolePermission(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionDto> {
    const rolePermission = this.rolePermissionRepository.create(createRolePermissionDto);
    return this.rolePermissionRepository.save(rolePermission);
  }

  async findRolePermissionById(id: number): Promise<RolePermissionDto> {
    return this.getRolePermission(id);
  }

  async findRolePermissionByName(name: string): Promise<RolePermissionDto> {
    const rolePermission = this.rolePermissionRepository.findOne({ where: { name } });
    if (!rolePermission) {
      throw new HttpException("Привелегия не найдена", HttpStatus.NOT_FOUND);
    }
    return rolePermission;
  }

  async editRolePermission(rolePermissionId: number, editRolePermissionDto: EditRolePermissionDto): Promise<RolePermissionDto> {
    const rolePermission = await this.getRolePermission(rolePermissionId);
    await this.rolePermissionRepository.merge(rolePermission, editRolePermissionDto);
    return this.rolePermissionRepository.save(rolePermission);
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
    const role = await this.roleRepository.findOne({ where: { id }, relations: { permissions: true } });
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async findRoleById(id: number): Promise<RoleDto> {
    return await this.getRole(id);
  }

  async findRoleByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({ where: { name }, relations: {permissions: true} });
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

  async editRole(roleId: number, editRoleDto: EditRoleDto): Promise<RoleDto> {
    const role = await this.getRole(roleId);
    await this.roleRepository.merge(role, editRoleDto);
    return this.roleRepository.save(role);
  }

  async addRolePermission(roleId: number, addPermissionsRoleDto: PermissionsRoleIdDto): Promise<RoleDto> {
    const role = await this.getRole(roleId);
    const permission = await Promise.all(addPermissionsRoleDto.permissionsId.map(id => this.getRolePermission(id)));
    role.permissions.push(...permission);
    await this.removeAllPermissionsCache();
    return this.roleRepository.save(role);
  }

  async removeRolePermissionFromRole(roleId: number, removePermissionsRoleDto: PermissionsRoleIdDto): Promise<RoleDto> {
    const role = await this.getRole(roleId);
    role.permissions = role.permissions.filter(p => !removePermissionsRoleDto.permissionsId.includes(p.id));
    await this.removeAllPermissionsCache();
    return this.roleRepository.save(role);
  }

  private async removeAllPermissionsCache(): Promise<void> {
    const keys = await this.cacheManager.store.keys();
    const keysToDelete = keys.filter((key) => key.startsWith('profile_permissions:'));
    await Promise.all(keysToDelete.map((key) => this.cacheManager.del(key)));
  }

  async createStudentRole(studyGroup: string): Promise<Role> {
    let studentRole: Role;
    try {
      studentRole = await this.findRoleByName(studyGroup);
    } catch (e) {
      const role = this.roleRepository.create({
        name: studyGroup,
        description: `Учебная группа ${studyGroup}`
      });
      studentRole = await this.roleRepository.save(role);

      const defaultStudyGroupPermissions = [
        PermissionApp.MESSAGE_CHAT_CREATE,
        PermissionApp.MESSAGE_CHAT_READ_UPDATE_DELETE,
        PermissionApp.MESSAGE_CHANNEL_READ,
        PermissionApp.MESSAGE_FEEDBACK_CREATE,
        PermissionApp.MESSAGE_FEEDBACK_READ,
        PermissionApp.EVENT_VOTE_ALL
      ];

      for (const permission of defaultStudyGroupPermissions) {
        const rolePermission = this.rolePermissionRepository.create({
          name: permission.toString()
        });
        await this.rolePermissionRepository.save(rolePermission);
      }
    }
    return studentRole;
  }
}
