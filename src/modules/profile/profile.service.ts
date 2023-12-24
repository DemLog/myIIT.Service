import { HttpException, HttpStatus, Inject, Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";
import { RoleService } from "../role/role.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Profile } from "../../database/entities/profile/profile.entity";
import { ProfileInfo } from "../../database/entities/profile/profile-info.entity";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { AddRoleProfileDto } from "./dto/add-role-profile.dto";
import { RemoveRoleProfileDto } from "./dto/remove-role-profile.dto";
import { FileUploaderService } from "../file-uploader/file-uploader.service";
import { ResponsePhotoProfileDto } from "./dto/response-photo-profile.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(ProfileInfo)
    private readonly profileInfoRepository: Repository<ProfileInfo>,
    private readonly roleService: RoleService,
    private readonly fileUploaderService: FileUploaderService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileRepository.find({ relations: { profileInfo: true, roles: true } });
  }

  async findOne(id: number): Promise<ResponseProfileDto> {
    const profile = await this.getProfile(id);
    const roleList = profile.roles ? profile.roles.map((role) => ({ id: role.id, name: role.name, description: role.description })) : [];
    return { ...profile, roles: roleList };
  }

  async getProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id }, relations: { profileInfo: true, roles: { permissions: true } } });
    if (!profile) {
      throw new HttpException("Профиль не найден", HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.set(`profile:${id}`, profile);
    return profile;
  }

  async getProfilesInGroup(groupId: number): Promise<Profile[]> {
    return this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.roles', 'role')
      .where('role.id = :groupId', { groupId })
      .getMany();
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profileInfo = this.profileInfoRepository.create(createProfileDto.profileInfo);
    const profile = this.profileRepository.create({
      ...createProfileDto,
      profileInfo
    });
    return this.profileRepository.save(profile);
  }

  async update(id: number, updateProfileDto: EditProfileDto): Promise<ResponseProfileDto> {
    const profile = await this.getProfile(id);

    await this.cacheManager.del(`profile_permissions:${id}`);
    await this.cacheManager.del(`profile:${id}`);

    this.profileRepository.merge(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.getProfile(id);
    await this.cacheManager.del(`profile:${id}`);
    await this.cacheManager.del(`profile_permissions:${id}`);
    await this.profileRepository.remove(profile);
  }

  async search(nameQuery: string): Promise<ResponseProfileDto[]> {
    return await this.profileRepository
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.roles", "role")
      .where("profile.firstName LIKE :name OR profile.lastName LIKE :name", { name: `%${nameQuery}%` })
      .getMany();
  }

  async addProfileToRole(addRoleProfileDto: AddRoleProfileDto): Promise<void> {
    const role = await this.roleService.getRole(addRoleProfileDto.roleId);
    const profile = await this.getProfile(addRoleProfileDto.id);
    profile.roles.push(role);
    await this.cacheManager.del(`profile_permissions:${addRoleProfileDto.id}`);
    await this.profileRepository.save(profile);
  }

  async removeProfileFromRole(removeRoleProfileDto: RemoveRoleProfileDto): Promise<void> {
    const profile = await this.getProfile(removeRoleProfileDto.id);
    profile.roles = profile.roles.filter((r) => r.id !== removeRoleProfileDto.roleId);
    await this.cacheManager.del(`profile_permissions:${removeRoleProfileDto.id}`);
    await this.profileRepository.save(profile);
  }

  async uploadPhoto(@UploadedFile() file: Express.Multer.File, id: number): Promise<ResponsePhotoProfileDto> {
    const profile = await this.getProfile(id);
    const photo = await this.fileUploaderService.uploadMedia(file, {}, profile);

    this.profileRepository.merge(profile, {avatar: photo.url});
    await this.profileRepository.save(profile);
    return { url: photo.url, profileId: profile.id }
  }
}