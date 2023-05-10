import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Profile } from '../../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResponseProfileDto } from "./dto/response-profile.dto";

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Получить все профили' })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Get()
  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: 'Найти профили по части имени' })
  @ApiQuery({ name: 'q', type: String })
  @ApiResponse({ status: 200, type: [ResponseProfileDto] })
  @Get('search')
  async search(@Query('q') q: string): Promise<ResponseProfileDto[]> {
    return this.profileService.search(q);
  }

  @ApiOperation({ summary: 'Получить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseProfileDto> {
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать новый профиль' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, type: Profile })
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Изменить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseProfileDto> {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: 'Удалить профиль по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.profileService.remove(id);
  }

}