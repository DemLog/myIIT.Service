import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Timetable } from "../../../database/entities/timetable/timetable.entity";
import { Equal, Repository } from "typeorm";
import { CreateLessonScheduleDto } from "../dto/lessonSchedule/create-lesson-schedule.dto";
import { ResponseLessonScheduleDto } from "../dto/lessonSchedule/response-lesson-schedule.dto";
import { LecturerTimetableService, SubjectTimetableService, TimeScheduleService } from "./";
import { RoleService } from "../../role/role.service";
import { UpdateLessonScheduleDto } from "../dto/lessonSchedule/update-lesson-schedule.dto";
import { DayWeek } from "../../../common/enums/timetable/dayWeek.enum";
import { NotificationService } from "../../notification/notification.service";
import { NotificationLevel } from "../../../common/enums/notification/notificationLevel.enum";
import { RecipientType } from "../../../common/enums/notification/recipientType.enum";
import { ResponseEvenWeek } from "../dto/timetable/response-even-week.dto";
import { TimetableSchedule } from "src/database/entities/timetable/timetable-schedule.entity";
import { Role } from "src/database/entities/role/role.entity";

@Injectable()
export class LessonScheduleService {
  constructor(
    @InjectRepository(Timetable)
    private readonly lessonScheduleRepository: Repository<Timetable>,
    private readonly lectureService: LecturerTimetableService,
    private readonly subjectService: SubjectTimetableService,
    private readonly timeScheduleService: TimeScheduleService,
    private readonly roleService: RoleService,
    private readonly notificationService: NotificationService
  ) {
  }

  async isEvenWeek(date: Date): Promise<ResponseEvenWeek> {
    const START_DAY = new Date(2023, 7, 27);
    const numberOfWeeks = Math.floor((date.getTime() - START_DAY.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return { isEvenWeek: numberOfWeeks % 2 === 0 };
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
    const lesson = await this.lessonScheduleRepository.save(createLessonSchedule);

    this.notificationService.create({
      title: `Добавлено новое занятие ${lesson.subject.title}`,
      description: `Дисциплина ${lesson.subject.title} будет проходит в ${lesson.dayWeek}, ${lesson.time.id} парой, ${lesson.isEvenWeek ? "второй" : "первой"} недели`,
      level: NotificationLevel.Info,
      service: "Расписание",
      recipientType: RecipientType.Group,
      recipientId: lesson.groups[0].id
    });

    return lesson;
  }

  async getLessonSchedule(id: number): Promise<Timetable> {
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
    return this.lessonScheduleRepository.find({
      relations: {
        subject: true,
        lecture: true,
        time: true,
        groups: true
      }
    });
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

    const lesson = await this.lessonScheduleRepository.save(lessonSchedule);

    this.notificationService.create({
      title: `Изменено занятие ${lessonSchedule.subject.title}`,
      description: `Дисциплина ${lessonSchedule.subject.title} будет проходит в ${lesson.dayWeek}, ${lesson.time.id} парой, ${lesson.isEvenWeek ? "второй" : "первой"} недели`,
      level: NotificationLevel.Info,
      service: "Расписание",
      recipientType: RecipientType.Group,
      recipientId: lesson.groups[0].id
    });

    return lesson;
  }

  async getTodayScheduleForGroup(userGroup: string): Promise<ResponseLessonScheduleDto[]> {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const { isEvenWeek } = await this.isEvenWeek(new Date());
    const group = await this.roleService.findRoleByName(userGroup);
    const schedule = await this.lessonScheduleRepository.find({
      where: {
        groups: Equal(group),
        dayWeek: DayWeek[today],
        isEvenWeek
      },
      relations: {
        subject: true,
        groups: true,
        lecture: true,
        time: true
      }
    });
    return schedule;
  };

  async getNowScheduleForGroup(userGroup: string): Promise<ResponseLessonScheduleDto> {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const { isEvenWeek } = await this.isEvenWeek(new Date());
    const group = await this.roleService.findRoleByName(userGroup);
    const timeData = await this.timeScheduleService.getNowSchedule();
    let schedule: ResponseLessonScheduleDto = {} as ResponseLessonScheduleDto;

    if (timeData.status) {
      const time: TimetableSchedule = {id: timeData.id, number: timeData.number, startTime: timeData.startTime, endTime: timeData.endTime} as TimetableSchedule;
      schedule = await this.lessonScheduleRepository.findOne({
        where: {
          groups: Equal(group),
          dayWeek: DayWeek[today],
          time: Equal(time),
          isEvenWeek
        },
        relations: {
          subject: true,
          groups: true,
          lecture: true,
          time: true
        }
      });
    }

    return schedule;
  }

  async getWeeklyScheduleForGroup(userGroup: string, isEvenWeek: boolean): Promise<ResponseLessonScheduleDto[]> {
    const group = await this.roleService.findRoleByName(userGroup);
    return await this.lessonScheduleRepository.find({
      where: {
        groups: Equal(group),
        isEvenWeek
      },
      relations: {
        subject: true,
        groups: true,
        lecture: true,
        time: true
      }
    });
  }

  async remove(id: number): Promise<void> {
    await this.lessonScheduleRepository.delete(id);
  }
}