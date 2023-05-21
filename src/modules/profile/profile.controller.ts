import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { Profile } from "../../database/entities/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";
import { RoleIdDto } from "./dto/role-id.dto";
import { Permission } from "../../common/enums/permission.enum";
import { Permissions } from "../../common/decorators/permissions.decorator";

@ApiTags('profiles')
@ApiBearerAuth()
@Permissions(Permission.PROFILE_ALL)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({summary: 'Добавить пользователя в группу по ID'})
  @ApiBody({ type: RoleIdDto })
  @ApiResponse({status: 200})
  @Permissions(Permission.ROLE_ALL)
  @Post(':id/role')
  async addProfileToRole(@Param('id') id: number, @Body() roleIdDto: RoleIdDto) {
    return this.profileService.addProfileToRole(id, roleIdDto);
  }

  @ApiOperation({summary: 'Удалить пользователя из группы по ID'})
  @ApiBody({ type: RoleIdDto })
  @ApiResponse({status: 204})
  @Permissions(Permission.ROLE_ALL)
  @Delete(':id/role')
  async removeProfileFromRole(@Param('id') id: number, @Body() roleIdDto: RoleIdDto) {
    return this.profileService.removeProfileFromRole(id, roleIdDto);
  }

  @ApiOperation({ summary: 'Получить все профили' })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(Permission.PROFILE_READ, Permission.PROFILE_READ_UPDATE)
  @Get()
  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: 'Найти профили по части имени' })
  @ApiQuery({ name: 'q', type: String })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Permissions(Permission.PROFILE_READ)
  @Get('search')
  async search(@Query('q') q: string): Promise<ResponseProfileDto[]> {
    return this.profileService.search(q);
  }

  @ApiOperation({ summary: 'Получить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(Permission.PROFILE_READ, Permission.PROFILE_READ_UPDATE)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseProfileDto> {
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать новый профиль' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, type: Profile })
  @Permissions(Permission.PROFILE_CREATE)
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Изменить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Permissions(Permission.PROFILE_UPDATE, Permission.PROFILE_READ_UPDATE, Permission.PROFILE_READ_UPDATE_DELETE)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseProfileDto> {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: 'Удалить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Permissions(Permission.PROFILE_DELETE, Permission.PROFILE_READ_UPDATE_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.profileService.remove(id);
  }

}