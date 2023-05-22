import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonSchedule } from "../../../database/entities/timetable/lesson-schedule.entity";
import { Repository } from "typeorm";
import { CreateLessonScheduleDto } from "../dto/lessonSchedule/create-lesson-schedule.dto";
import { ResponseLessonScheduleDto } from "../dto/lessonSchedule/response-lesson-schedule.dto";
import { LecturerTimetableService, SubjectTimetableService, TimeScheduleService } from "./";
import { RoleService } from "../../role/role.service";
import { UpdateLessonScheduleDto } from "../dto/lessonSchedule/update-lesson-schedule.dto";
import { DayWeek } from "../../../common/enums/dayWeek.enum";

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

  public isEvenWeek(date: Date): boolean {
    const START_DAY = new Date(2021, 7, 30); // August 30, 2021
    const numberOfWeeks = Math.floor((date.getTime() - START_DAY.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return numberOfWeeks % 2 === 0;
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

    if (updateLessonScheduleDto.subject) {
      lessonSchedule.subject = await this.subjectService.getSubject(updateLessonScheduleDto.subject);
    }

    if (updateLessonScheduleDto.time) {
      lessonSchedule.time = await this.timeScheduleService.getTimeSchedule(updateLessonScheduleDto.time);
    }

    if (updateLessonScheduleDto.lecture) {
      lessonSchedule.lecture = await Promise.all(updateLessonScheduleDto.lecture.map(id => this.lectureService.getLecturer(id)));
    }

    if (updateLessonScheduleDto.groups) {
      lessonSchedule.groups = await Promise.all(updateLessonScheduleDto.groups.map(id => this.roleService.getRole(id)));
    }

    return this.lessonScheduleRepository.save(lessonSchedule);
  }

  async getTodayScheduleForGroup(userGroup: string): Promise<ResponseLessonScheduleDto[]> {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const isEvenWeek = this.isEvenWeek(new Date());
    const group = await this.roleService.findRoleByName(userGroup);
    const schedule = await this.lessonScheduleRepository.find({
      where: {
        groups: group,
        dayWeek: DayWeek[today],
        isEvenWeek,
      },
      relations: {
        subject: true,
        groups: true,
        lecture: true,
        time: true
      },
    });
    return schedule;
  }

  async getWeeklyScheduleForGroup(userGroup: string, isEvenWeek: boolean): Promise<ResponseLessonScheduleDto[]> {
    const group = await this.roleService.findRoleByName(userGroup);
    return await this.lessonScheduleRepository.find({
      where: {
        groups: group,
        isEvenWeek,
      },
      relations: {
        subject: true,
        groups: true,
        lecture: true,
        time: true
      },
    });
  }
}