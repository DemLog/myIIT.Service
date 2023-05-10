import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "../../database/entities/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ResponseProfileDto } from "./dto/response-profile.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<ResponseProfileDto[]> {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<ResponseProfileDto> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new HttpException("Профиль не найден", HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ResponseProfileDto> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new HttpException("Профиль не найден", HttpStatus.NOT_FOUND);
    }
    this.profileRepository.merge(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new HttpException("Профиль не найден", HttpStatus.NOT_FOUND);
    }
    await this.profileRepository.remove(profile);
  }

  async search(nameQuery: string): Promise<ResponseProfileDto[]> {
    return await this.profileRepository
      .createQueryBuilder("profile")
      .where("profile.firstName LIKE :name OR profile.lastName LIKE :name", { name: `%${nameQuery}%` })
      .getMany();
  }
}