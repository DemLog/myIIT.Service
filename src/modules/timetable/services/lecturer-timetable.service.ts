import { InjectRepository } from "@nestjs/typeorm";
import { Lecturer } from "../../../database/entities/timetable/lecturer.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateLecturerDto } from "../dto/lecturer/create-lecturer.dto";
import { ResponseLecturerDto } from "../dto/lecturer/response-lecturer.dto";
import { UpdateLecturerDto } from "../dto/lecturer/update-lecturer.dto";

@Injectable()
export class LecturerTimetableService {
  constructor(
    @InjectRepository(Lecturer)
    private readonly lecturerRepository: Repository<Lecturer>,
  ) {}

  async create(createLecturerDto: CreateLecturerDto): Promise<ResponseLecturerDto> {
    const lecturer = this.lecturerRepository.create(createLecturerDto);
    return this.lecturerRepository.save(lecturer);
  }

  async getLecturer(id: number): Promise<Lecturer> {
    const lecturer = await this.lecturerRepository.findOne({where: {id}});
    if (!lecturer) {
      throw new HttpException("Преподаватель не найден", HttpStatus.NOT_FOUND);
    }
    return lecturer;
  }

  async findAll(): Promise<ResponseLecturerDto[]> {
    return this.lecturerRepository.find();
  }

  async findOne(id: number): Promise<ResponseLecturerDto> {
    return this.getLecturer(id);
  }

  async update(id: number, updateLecturerDto: UpdateLecturerDto): Promise<ResponseLecturerDto> {
    const lecturer = await this.getLecturer(id);
    this.lecturerRepository.merge(lecturer, updateLecturerDto);
    return await this.lecturerRepository.save(lecturer);
  }

  async remove(id: number): Promise<void> {
    await this.lecturerRepository.delete(id);
  }
}