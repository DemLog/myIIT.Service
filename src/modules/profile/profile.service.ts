import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "../../database/entities/users/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";
import { RoleService } from "../role/role.service";
import { RoleIdDto } from "./dto/role-id.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly roleService: RoleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileRepository.find({relations: {roles: true}});
  }

  async findOne(id: number): Promise<ResponseProfileDto> {
    const profile = await this.getProfile(id);
    const roleList = profile.roles ? profile.roles.map((role) => ({ id: role.id, name: role.name, description: role.description })) : [];
    return { ...profile, roles: roleList };
  }

  async getProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id }, relations: {roles: {permissions: true}} });
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
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ResponseProfileDto> {
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

  async addProfileToRole(id: number, roleIdDto: RoleIdDto): Promise<void> {
    const role = await this.roleService.getRole(roleIdDto.roleId);
    const profile = await this.getProfile(id);
    profile.roles.push(role);
    await this.cacheManager.del(`profile_permissions:${id}`);
    await this.profileRepository.save(profile);
  }

  async removeProfileFromRole(id: number, roleIdDto: RoleIdDto): Promise<void> {
    const profile = await this.getProfile(id);
    profile.roles = profile.roles.filter((r) => r.id !== roleIdDto.roleId);
    await this.cacheManager.del(`profile_permissions:${id}`);
    await this.profileRepository.save(profile);
  }
}