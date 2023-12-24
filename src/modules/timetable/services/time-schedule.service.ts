import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimetableSchedule } from "../../../database/entities/timetable/timetable-schedule.entity";
import { LessThanOrEqual, MoreThan, Repository } from "typeorm";
import { CreateTimeScheduleDto } from "../dto/timeSchedule/create-time-schedule.dto";
import { UpdateTimeScheduleDto } from "../dto/timeSchedule/update-time-schedule.dto";
import { ResponseTimeScheduleDto } from "../dto/timeSchedule/response-time-schedule.dto";
import { ResponseNowTimeSchedule } from "../dto/timeSchedule/response-now-time-schedule.dto";

@Injectable()
export class TimeScheduleService {
  constructor(
    @InjectRepository(TimetableSchedule)
    private readonly timeScheduleRepository: Repository<TimetableSchedule>
  ) {}

  async create(createTimeScheduleDto: CreateTimeScheduleDto): Promise<ResponseTimeScheduleDto> {
    const timeSchedule = this.timeScheduleRepository.create(createTimeScheduleDto);
    return this.timeScheduleRepository.save(timeSchedule);
  }

  async getTimeSchedule(id: number): Promise<TimetableSchedule> {
    const timeSchedule = await this.timeScheduleRepository.findOne({where: {id}});
    if (!timeSchedule) {
      throw new HttpException("Время пары не найдено", HttpStatus.NOT_FOUND);
    }
    return timeSchedule;
  }

  async findAll(): Promise<ResponseTimeScheduleDto[]> {
    return this.timeScheduleRepository.find();
  }

  async findOne(id: number): Promise<ResponseTimeScheduleDto> {
    return this.getTimeSchedule(id);
  }

  async update(id: number, updateTimeScheduleDto: UpdateTimeScheduleDto): Promise<ResponseTimeScheduleDto> {
    const timeSchedule = await this.getTimeSchedule(id);
    this.timeScheduleRepository.merge(timeSchedule, updateTimeScheduleDto);
    return this.timeScheduleRepository.save(timeSchedule);
  }

  async remove(id: number): Promise<void> {
    await this.timeScheduleRepository.delete(id);
  }

  async getNowSchedule(): Promise<ResponseNowTimeSchedule> {
    const timeNow = new Date();
    const response = await this.timeScheduleRepository.findOne({where: {startTime: LessThanOrEqual(timeNow), endTime: MoreThan(timeNow)}});
    const status = response ? true : false;
    return {...response, status}
  }
}