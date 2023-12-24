import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRolePermissionDto } from "./dto/create-role-permission.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleDto } from "./dto/role.dto";
import { PermissionsRoleIdDto } from "./dto/permissions-role-id.dto";
import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleListDto } from "./dto/role-list.dto";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { PermissionApp } from "../../common/enums/role/permission.enum";
import { EditRoleDto } from "./dto/edit-role.dto";
import { EditRolePermissionDto } from "./dto/edit-role-permission.dto";

@ApiTags('Roles')
@ApiBearerAuth()
@Permissions(PermissionApp.ROLE_ALL)
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Создать привелегию' })
  @ApiResponse({ status: 201, description: 'Успешно', type: RolePermissionDto })
  @Permissions(PermissionApp.ROLE_PERMISSION_CREATE)
  @Post('role.createPermission')
  async createRolePermission(
    @Body() createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionDto> {
    return this.roleService.createRolePermission(createRolePermissionDto);
  }

  @ApiOperation({ summary: 'Получить все привелегии' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [RolePermissionDto] })
  @Permissions(
    PermissionApp.ROLE_PERMISSION_READ,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Get('role.getPermissionAll')
  async getAllRolePermissions(): Promise<RolePermissionDto[]> {
    return this.roleService.getAllRolePermissions();
  }

  @ApiOperation({ summary: 'Получить привелегию по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RolePermissionDto })
  @Permissions(
    PermissionApp.ROLE_PERMISSION_READ,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE_DELETE,
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
    PermissionApp.ROLE_PERMISSION_DELETE,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Delete('role.deletePermission')
  async deleteRolePermission(@Query('id') id: number): Promise<void> {
    return this.roleService.deleteRolePermission(id);
  }

  @ApiOperation({ summary: 'Добавить права на роль' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionApp.ROLE_UPDATE,
    PermissionApp.ROLE_READ_UPDATE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Post('role.addRermission')
  async addRolePermission(
    @Query('id') roleId: number,
    @Body() addPermissionsRoleDto: PermissionsRoleIdDto,
  ): Promise<RoleDto> {
    return this.roleService.addRolePermission(roleId, addPermissionsRoleDto);
  }

  @ApiOperation({ summary: 'Удалить права из роли' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionApp.ROLE_UPDATE,
    PermissionApp.ROLE_READ_UPDATE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Delete('role.removePermission')
  async removeRolePermissionFromRole(
    @Query('id') roleId: number,
    @Body() removePermissionsRoleDto: PermissionsRoleIdDto,
  ): Promise<RoleDto> {
    return this.roleService.removeRolePermissionFromRole(roleId, removePermissionsRoleDto);
  }

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана', type: RoleDto })
  @Permissions(
    PermissionApp.ROLE_CREATE
  )
  @Post("role.create")
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [RoleListDto] })
  @Permissions(
    PermissionApp.ROLE_READ,
    PermissionApp.ROLE_READ_UPDATE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Get("role.getAll")
  async getAllRoles(): Promise<RoleListDto[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить роль по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: RoleDto })
  @Permissions(
    PermissionApp.ROLE_READ,
    PermissionApp.ROLE_READ_UPDATE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Get('role.get')
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
    PermissionApp.ROLE_DELETE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Delete('role.deleteRole')
  async deleteRole(@Query('id') id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @ApiOperation({ summary: 'Редактировать роль' })
  @ApiResponse({ status: 200, description: 'Роль успешно отредактирована' })
  @ApiParam({ name: "id", type: Number})
  @ApiBody({ type: EditRoleDto })
  @Permissions(
    PermissionApp.ROLE_UPDATE,
    PermissionApp.ROLE_READ_UPDATE,
    PermissionApp.ROLE_READ_UPDATE_DELETE,
  )
  @Put('role.edit')
  async editRole(@Query('id') id: number, @Body() editRoleDto: EditRoleDto): Promise<RoleDto> {
    return this.roleService.editRole(id, editRoleDto);
  }

  @ApiOperation({ summary: 'Редактировать привелегию' })
  @ApiResponse({ status: 200, description: 'Привелегия успешно отредактирована' })
  @ApiParam({ name: "id", type: Number})
  @ApiBody({ type: EditRolePermissionDto })
  @Permissions(
    PermissionApp.ROLE_PERMISSION_UPDATE,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE,
    PermissionApp.ROLE_PERMISSION_READ_UPDATE_DELETE,
  )
  @Put('role.editPermission')
  async editRolePermission(@Query('id') id: number, @Body() editRolePermissionDto: EditRolePermissionDto): Promise<RolePermissionDto> {
    return this.roleService.editRolePermission(id, editRolePermissionDto);
  }
}
