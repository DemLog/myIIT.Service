import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonSchedule } from "../../../database/entities/timetable/lesson-schedule.entity";
import { Repository } from "typeorm";
import { CreateLessonScheduleDto } from "../dto/lessonSchedule/create-lesson-schedule.dto";
import { ResponseLessonScheduleDto } from "../dto/lessonSchedule/response-lesson-schedule.dto";
import { LecturerTimetableService, SubjectTimetableService, TimeScheduleService } from "./";
import { RoleService } from "../../role/role.service";
import { UpdateLessonScheduleDto } from "../dto/lessonSchedule/update-lesson-schedule.dto";
import { Subject } from "../../../database/entities/timetable/subject.entity";
import { TimeSchedule } from "../../../database/entities/timetable/time-schedule.entity";
import { Lecturer } from "../../../database/entities/timetable/lecturer.entity";
import { Role } from "../../../database/entities/role.entity";

@Injectable()
export class LessonScheduleService {
  constructor(
    @InjectRepository(LessonSchedule)
    private readonly lessonScheduleRepository: Repository<LessonSchedule>,
    private readonly lectureService: LecturerTimetableService,
    private readonly subjectService: SubjectTimetableService,
    private readonly timeScheduleService: TimeScheduleService,
    private readonly roleService: RoleService
  ) {
  }

  async create(createLessonScheduleDto: CreateLessonScheduleDto): Promise<ResponseLessonScheduleDto> {
    const subject = await this.subjectService.getSubject(createLessonScheduleDto.subject);
    const timeSchedule = await this.timeScheduleService.getTimeSchedule(createLessonScheduleDto.time);
    const lecture = await Promise.all(createLessonScheduleDto.lecture.map(id => this.lectureService.getLecturer(id)));
    const groups = await Promise.all(createLessonScheduleDto.groups.map(id => this.roleService.getRole(id)));

    const createLessonSchedule = this.lessonScheduleRepository.create({
      subject,
      groups,
      isEvenWeek: createLessonScheduleDto.isEvenWeek,
      lecture,
      cabinet: createLessonScheduleDto.cabinet,
      dayWeek: createLessonScheduleDto.dayWeek,
      time: timeSchedule
    });

    return this.lessonScheduleRepository.save(createLessonSchedule);
  }

  async getLessonSchedule(id: number): Promise<LessonSchedule> {
    const lessonSchedule = await this.lessonScheduleRepository.findOne({
      where: { id },
      relations: { subject: true, groups: true, time: true, lecture: true }
    });
    if (!lessonSchedule) {
      throw new HttpException("Занятие не найдено", HttpStatus.NOT_FOUND);
    }
    return lessonSchedule;
  }

  async findAll(): Promise<ResponseLessonScheduleDto[]> {
    return this.lessonScheduleRepository.find();
  }

  async findOne(id: number): Promise<ResponseLessonScheduleDto> {
    return this.getLessonSchedule(id);
  }

  async update(id: number, updateLessonScheduleDto: UpdateLessonScheduleDto): Promise<ResponseLessonScheduleDto> {
    const lessonSchedule = await this.getLessonSchedule(id);
    let subject: Subject;
    let timeSchedule: TimeSchedule;
    let lecture: Lecturer[];
    let groups: Role[];

    if (updateLessonScheduleDto.subject) {
      
    }
  }
}