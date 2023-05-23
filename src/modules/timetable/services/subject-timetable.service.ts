import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "../../../database/entities/timetable/subject.entity";
import { Repository } from "typeorm";
import { CreateSubjectDto } from "../dto/subject/create-subject.dto";
import { UpdateSubjectDto } from "../dto/subject/update-subject.dto";
import { ResponseSubjectDto } from "../dto/subject/response-subject.dto";

@Injectable()
export class SubjectTimetableService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async getSubject(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({where: {id}});
    if (!subject) {
      throw new HttpException("Предмет не найден", HttpStatus.NOT_FOUND);
    }
    return subject;
  }

  async findAll(): Promise<ResponseSubjectDto[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<ResponseSubjectDto> {
    return this.getSubject(id);
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<ResponseSubjectDto> {
    const subject = await this.getSubject(id);
    this.subjectRepository.merge(subject, updateSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}