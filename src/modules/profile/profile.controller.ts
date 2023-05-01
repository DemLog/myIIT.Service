import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '../../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SearchProfileDto } from './dto/search-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.profileService.remove(id);
  }

  @Post('search')
  async search(@Body() searchProfileDto: SearchProfileDto): Promise<Profile[]> {
    return this.profileService.search(searchProfileDto);
  }
}