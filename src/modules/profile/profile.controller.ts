import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { Profile } from "../../database/entities/users/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";
import { RoleIdDto } from "./dto/role-id.dto";
import { PermissionDefault } from "../../common/enums/users/permission.enum";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CurrentUserPermissions } from "../../common/decorators/current-user-permissions.decorator";

@ApiTags("Profiles")
@ApiBearerAuth()
@Permissions(PermissionDefault.PROFILE_ALL)
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @ApiOperation({ summary: "Добавить пользователя в группу по ID" })
  @ApiBody({ type: RoleIdDto })
  @ApiResponse({ status: 200 })
  @Permissions(PermissionDefault.ROLE_ALL)
  @Post("profile.addUserRole")
  async addProfileToRole(@Query("id") id: number, @Body() roleIdDto: RoleIdDto) {
    return this.profileService.addProfileToRole(id, roleIdDto);
  }

  @ApiOperation({ summary: "Удалить пользователя из группы по ID" })
  @ApiBody({ type: RoleIdDto })
  @ApiResponse({ status: 204 })
  @Permissions(PermissionDefault.ROLE_ALL)
  @Delete("profile.removeUserRole")
  async removeProfileFromRole(@Query("id") id: number, @Body() roleIdDto: RoleIdDto) {
    return this.profileService.removeProfileFromRole(id, roleIdDto);
  }

  @ApiOperation({ summary: "Получить все профили" })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(PermissionDefault.PROFILE_READ, PermissionDefault.PROFILE_READ_UPDATE)
  @Get("profile.getUserAll")
  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: "Найти профили по части имени" })
  @ApiQuery({ name: "q", type: String })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(PermissionDefault.PROFILE_READ)
  @Get("profile.searchUser")
  async search(@Query("q") q: string): Promise<ResponseProfileDto[]> {
    return this.profileService.search(q);
  }

  @ApiOperation({ summary: "Получить профиль по ID" })
  @ApiParam({ name: "id", type: Number, required: false, allowEmptyValue: true })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(PermissionDefault.PROFILE_READ, PermissionDefault.PROFILE_READ_UPDATE)
  @Get("profile.getUser")
  async findOne(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<ResponseProfileDto> {
    if (!id) {
      id = currentUser.id;
    }
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: "Создать новый профиль" })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, type: Profile })
  @Permissions(PermissionDefault.PROFILE_CREATE)
  @Post("profile.createUser")
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: "Изменить профиль по ID" })
  @ApiParam({ name: "id", type: Number, required: false, allowEmptyValue: true })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(PermissionDefault.PROFILE_UPDATE, PermissionDefault.PROFILE_READ_UPDATE, PermissionDefault.PROFILE_READ_UPDATE_DELETE)
  @Put("profile.editUser")
  async update(@Query("id") id: number,
               @Body() updateProfileDto: UpdateProfileDto,
               @CurrentUser() currentUser: Profile,
               @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<ResponseProfileDto> {
    if (!id) {
      id = currentUser.id;
    }

    const hasFullAccess = currentUserPermissions.includes(PermissionDefault.PROFILE_ALL.toString()) || currentUserPermissions.includes(PermissionDefault.PERMISSION_ALL.toString());
    if (id !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: "Удалить профиль по ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 204 })
  @Permissions(PermissionDefault.PROFILE_DELETE, PermissionDefault.PROFILE_READ_UPDATE_DELETE)
  @Delete("profile.deleteUser")
  async remove(@Query("id") id: number): Promise<void> {
    return this.profileService.remove(id);
  }

}