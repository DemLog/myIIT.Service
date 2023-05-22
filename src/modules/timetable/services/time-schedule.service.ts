import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimeSchedule } from "../../../database/entities/timetable/time-schedule.entity";
import { Repository } from "typeorm";
import { CreateTimeScheduleDto } from "../dto/timeSchedule/create-time-schedule.dto";
import { UpdateTimeScheduleDto } from "../dto/timeSchedule/update-time-schedule.dto";
import { ResponseTimeScheduleDto } from "../dto/timeSchedule/response-time-schedule.dto";

@Injectable()
export class TimeScheduleService {
  constructor(
    @InjectRepository(TimeSchedule)
    private readonly timeScheduleRepository: Repository<TimeSchedule>
  ) {}

  async create(createTimeScheduleDto: CreateTimeScheduleDto): Promise<ResponseTimeScheduleDto> {
    const timeSchedule = this.timeScheduleRepository.create(createTimeScheduleDto);
    return this.timeScheduleRepository.save(timeSchedule);
  }

  async getTimeSchedule(id: number): Promise<TimeSchedule> {
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
}