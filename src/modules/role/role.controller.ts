import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRolePermissionDto } from "./dto/create-role-permission.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleDto } from "./dto/role.dto";
import { PermissionsRoleIdDto } from "./dto/permissions-role-id.dto";
import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleListDto } from "./dto/role-list.dto";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { PermissionDefault } from "../../common/enums/users/permission.enum";

@ApiTags('Roles')
@ApiBearerAuth()
@Permissions(PermissionDefault.ROLE_ALL)
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Создать привелегию' })
  @ApiResponse({ status: 201, description: 'Успешно', type: RolePermissionDto })
  @Permissions(PermissionDefault.ROLE_PERMISSION_CREATE)
  @Post('role.createPermission')
  async createRolePermission(
    @Body() createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionDto> {
    return this.roleService.createRolePermission(createRolePermissionDto);
  }

  @ApiOperation({ summary: 'Получить все привелегии' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [RolePermissionDto] })
  @Permissions(
    PermissionDefault.ROLE_PERMISSION_READ,
    PermissionDefault.ROLE_PERMISSION_READ_UPDATE,
    PermissionDefault.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Get('role.getPermissionAll')
  async getAllRolePermissions(): Promise<RolePermissionDto[]> {
    return this.roleService.getAllRolePermissions();
  }

  @ApiOperation({ summary: 'Получить привелегию по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RolePermissionDto })
  @Permissions(
    PermissionDefault.ROLE_PERMISSION_READ,
    PermissionDefault.ROLE_PERMISSION_READ_UPDATE,
    PermissionDefault.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Get('role.getPermission')
  async getRolePermissionById(@Query('id') id: number): Promise<RolePermissionDto> {
    return this.roleService.findRolePermissionById(id);
  }

  // @ApiOperation({ summary: 'Получить привелегию по названию' })
  // @ApiResponse({ status: 200, description: 'Успешно', type: RolePermissionDto })
  // @Get('permissions/:name')
  // async getRolePermissionByName(@Param('name') name: string): Promise<RolePermissionDto> {
  //   return this.roleService.findRolePermissionByName(name);
  // }

  @ApiOperation({ summary: 'Удалить привелегию' })
  @ApiResponse({ status: 204, description: 'Успешно', type: RolePermissionDto })
  @Permissions(
    PermissionDefault.ROLE_PERMISSION_DELETE,
    PermissionDefault.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Delete('role.deletePermission')
  async deleteRolePermission(@Query('id') id: number): Promise<void> {
    return this.roleService.deleteRolePermission(id);
  }

  @ApiOperation({ summary: 'Добавить права на роль' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionDefault.ROLE_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE_DELETE,
  )
  @Post('role.addRolePermissions')
  async addRolePermission(
    @Query('id') roleId: number,
    @Body() addPermissionsRoleDto: PermissionsRoleIdDto,
  ): Promise<RoleDto> {
    return this.roleService.addRolePermission(roleId, addPermissionsRoleDto);
  }

  @ApiOperation({ summary: 'Удалить права из роли' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionDefault.ROLE_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE_DELETE,
  )
  @Delete('role.deleteRolePermissions')
  async removeRolePermissionFromRole(
    @Query('id') roleId: number,
    @Body() removePermissionsRoleDto: PermissionsRoleIdDto,
  ): Promise<RoleDto> {
    return this.roleService.removeRolePermissionFromRole(roleId, removePermissionsRoleDto);
  }

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана', type: RoleDto })
  @Permissions(
    PermissionDefault.ROLE_CREATE
  )
  @Post("role.createRole")
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [RoleListDto] })
  @Permissions(
    PermissionDefault.ROLE_READ,
    PermissionDefault.ROLE_READ_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE_DELETE,
  )
  @Get("role.getRoleAll")
  async getAllRoles(): Promise<RoleListDto[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить роль по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionDefault.ROLE_READ,
    PermissionDefault.ROLE_READ_UPDATE,
    PermissionDefault.ROLE_READ_UPDATE_DELETE,
  )
  @Get('role.getRole')
  async getRoleById(@Query('id') id: number): Promise<RoleDto> {
    return this.roleService.findRoleById(id);
  }

  // @ApiOperation({ summary: 'Получить роль по имени' })
  // @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  // @Get(':name')
  // async getRoleByName(@Param('name') name: string): Promise<RoleDto> {
  //   return this.roleService.findRoleByName(name);
  // }

  @ApiOperation({ summary: 'Удалить роль' })
  @ApiResponse({ status: 204, description: 'Роль успешно удалена' })
  @Permissions(
    PermissionDefault.ROLE_DELETE,
    PermissionDefault.ROLE_READ_UPDATE_DELETE,
  )
  @Delete('role.deleteRole')
  async deleteRole(@Query('id') id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
