import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CurrentUserPermissions } from "../../common/decorators/current-user-permissions.decorator";
import { PermissionApp } from "../../common/enums/role/permission.enum";
import { Profile } from "../../database/entities/profile/profile.entity";
import { AddRoleProfileDto } from "./dto/add-role-profile.dto";
import { RemoveRoleProfileDto } from "./dto/remove-role-profile.dto";
import { UploadPhotoProfileDto } from "./dto/upload-photo-profile.dto";
import { ResponsePhotoProfileDto } from "./dto/response-photo-profile.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Profiles")
@ApiBearerAuth()
@Permissions(PermissionApp.PROFILE_ALL)
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @ApiOperation({ summary: "Добавить пользователя в группу по ID" })
  @ApiResponse({ status: 200 })
  @Permissions(PermissionApp.ROLE_ALL)
  @Get("profile.addRole")
  async addProfileToRole(@Query() addRoleProfileDto: AddRoleProfileDto): Promise<void> {
    return this.profileService.addProfileToRole(addRoleProfileDto);
  }

  @ApiOperation({ summary: "Удалить пользователя из группы по ID" })
  @ApiResponse({ status: 200 })
  @Permissions(PermissionApp.ROLE_ALL)
  @Delete("profile.removeRole")
  async removeProfileFromRole(@Query() removeRoleProfileDto: RemoveRoleProfileDto): Promise<void> {
    return this.profileService.removeProfileFromRole(removeRoleProfileDto);
  }

  @ApiOperation({ summary: "Получить все профили" })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(PermissionApp.PROFILE_READ, PermissionApp.PROFILE_READ_UPDATE, PermissionApp.PROFILE_READ_UPDATE_DELETE)
  @Get("profile.getAll")
  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: "Найти профили по части имени" })
  @ApiQuery({ name: "q", type: String, description: "Поисковая строка" })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(PermissionApp.PROFILE_READ, PermissionApp.PROFILE_READ_UPDATE, PermissionApp.PROFILE_READ_UPDATE_DELETE)
  @Get("profile.search")
  async search(@Query("q") q: string): Promise<ResponseProfileDto[]> {
    return this.profileService.search(q);
  }

  @ApiOperation({ summary: "Получить профиль по ID" })
  @ApiParam({ name: "id", type: Number, required: false, allowEmptyValue: true })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(PermissionApp.PROFILE_READ, PermissionApp.PROFILE_READ_UPDATE)
  @Get("profile.get")
  async findOne(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<ResponseProfileDto> {
    if (!id) {
      id = currentUser.id;
    }
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: "Создать новый профиль" })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, type: Profile })
  @Permissions(PermissionApp.PROFILE_CREATE)
  @Post("profile.create")
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: "Изменить профиль по ID" })
  @ApiParam({ name: "id", type: Number, required: false, allowEmptyValue: true })
  @ApiBody({ type: EditProfileDto })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(PermissionApp.PROFILE_UPDATE, PermissionApp.PROFILE_READ_UPDATE, PermissionApp.PROFILE_READ_UPDATE_DELETE)
  @Put("profile.edit")
  async update(@Query("id") id: number,
               @Body() updateProfileDto: EditProfileDto,
               @CurrentUser() currentUser: Profile,
               @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<ResponseProfileDto> {
    if (!id) {
      id = currentUser.id;
    }

    const hasFullAccess = currentUserPermissions.includes(PermissionApp.PROFILE_ALL.toString()) || currentUserPermissions.includes(PermissionApp.OWNER_ALL.toString());
    if (id !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: "Удалить профиль по ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 204 })
  @Permissions(PermissionApp.PROFILE_DELETE, PermissionApp.PROFILE_READ_UPDATE_DELETE)
  @Delete("profile.delete")
  async remove(@Query("id") id: number): Promise<void> {
    return this.profileService.remove(id);
  }

  @ApiOperation({ summary: "Загрузить фото профиля" })
  @ApiBody({ type: UploadPhotoProfileDto })
  @ApiResponse({ status: 201, type: ResponsePhotoProfileDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 6 * 1024 * 1024
    }
  }))
  @Permissions(PermissionApp.PROFILE_UPDATE, PermissionApp.PROFILE_READ_UPDATE, PermissionApp.PROFILE_READ_UPDATE_DELETE)
  @Post("profile.uploadPhoto")
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @CurrentUser() currentUser: Profile): Promise<ResponsePhotoProfileDto> {
    return this.profileService.uploadPhoto(file, currentUser.id)
  }
}