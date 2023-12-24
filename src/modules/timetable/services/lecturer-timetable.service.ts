import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateLecturerDto } from "../dto/lecturer/create-lecturer.dto";
import { ResponseLecturerDto } from "../dto/lecturer/response-lecturer.dto";
import { UpdateLecturerDto } from "../dto/lecturer/update-lecturer.dto";
import { TimetableLecturer } from "../../../database/entities/timetable/timetable-lecturer.entity";
import { ProfileService } from "src/modules/profile/profile.service";
import { Profile } from "src/database/entities/profile/profile.entity";

@Injectable()
export class LecturerTimetableService {
  constructor(
    @InjectRepository(TimetableLecturer)
    private readonly lecturerRepository: Repository<TimetableLecturer>,
    private readonly profileService: ProfileService
  ) { }

  async create(createLecturerDto: CreateLecturerDto): Promise<ResponseLecturerDto> {
    let profile: Profile = null;
    if (createLecturerDto.profile) {
      profile = await this.profileService.getProfile(createLecturerDto.profile);
    }

    const lecturerData: Partial<TimetableLecturer> = {
      lastName: createLecturerDto.lastName,
      firstName: createLecturerDto.firstName,
      patronymic: createLecturerDto.patronymic,
      position: createLecturerDto.position,
      contact: createLecturerDto.contact,
      profile: profile ?? null
    }
    const lecturer = this.lecturerRepository.create(lecturerData);
    return this.lecturerRepository.save(lecturer);
  }

  async getLecturer(id: number): Promise<TimetableLecturer> {
    const lecturer = await this.lecturerRepository.findOne({ where: { id }, relations: {profile: true} });
    if (!lecturer) {
      throw new HttpException("Преподаватель не найден", HttpStatus.NOT_FOUND);
    }
    return lecturer;
  }

  async findAll(): Promise<ResponseLecturerDto[]> {
    return this.lecturerRepository.find({relations: {profile: true}});
  }

  async findOne(id: number): Promise<ResponseLecturerDto> {
    return this.getLecturer(id);
  }

  async update(id: number, updateLecturerDto: UpdateLecturerDto): Promise<ResponseLecturerDto> {
    const lecturer = await this.getLecturer(id);

    let profile: Profile = null;
    if (updateLecturerDto.profile) {
      profile = await this.profileService.getProfile(updateLecturerDto.profile);
    }

    const lecturerData: Partial<TimetableLecturer> = {
      lastName: updateLecturerDto.lastName ?? lecturer.lastName,
      firstName: updateLecturerDto.firstName ?? lecturer.firstName,
      patronymic: updateLecturerDto.patronymic ?? lecturer.patronymic,
      position: updateLecturerDto.position ?? lecturer.position,
      contact: updateLecturerDto.contact ?? lecturer.contact,
      profile: updateLecturerDto ? profile : lecturer.profile
    }

    this.lecturerRepository.merge(lecturer, lecturerData);
    return await this.lecturerRepository.save(lecturer);
    
  }

  async remove(id: number): Promise<void> {
    await this.lecturerRepository.delete(id);
  }
}