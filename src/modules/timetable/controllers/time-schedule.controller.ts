import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TimeScheduleService } from "../services";
import { CreateTimeScheduleDto } from "../dto/timeSchedule/create-time-schedule.dto";
import { ResponseTimeScheduleDto } from "../dto/timeSchedule/response-time-schedule.dto";
import { UpdateTimeScheduleDto } from "../dto/timeSchedule/update-time-schedule.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseNowTimeSchedule } from "../dto/timeSchedule/response-now-time-schedule.dto";

@ApiTags('Timetable: TimeSchedule')
@ApiBearerAuth()
@Controller()
export class TimeScheduleController {
  constructor(private readonly timeScheduleService: TimeScheduleService) {}

  @ApiOperation({ summary: 'Создать расписание времени' })
  @ApiResponse({ status: 201, description: 'Успешно', type: ResponseTimeScheduleDto })
  @ApiBody({type: CreateTimeScheduleDto})
  @Post("timetable.createTimeSchedule")
  async create(@Body() createTimeScheduleDto: CreateTimeScheduleDto): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.create(createTimeScheduleDto);
  }

  @ApiOperation({ summary: 'Получить список расписаний времени' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseTimeScheduleDto] })
  @Get("timetable.getTimeScheduleAll")
  async findAll(): Promise<ResponseTimeScheduleDto[]> {
    return this.timeScheduleService.findAll();
  }

  @ApiOperation({ summary: 'Получить расписание времени по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseTimeScheduleDto })
  @Get('timetable.getTimeSchedule')
  async findOne(@Query('id') id: number): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить расписание времени' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseTimeScheduleDto })
  @ApiBody({type: UpdateTimeScheduleDto})
  @Put('timetable.editTimeSchedule')
  async update(
    @Query('id') id: number,
    @Body() updateTimeScheduleDto: UpdateTimeScheduleDto,
  ): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.update(id, updateTimeScheduleDto);
  }

  @ApiOperation({ summary: 'Удалить расписание времени' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @Delete('timetable.deleteTimeSchedule')
  async remove(@Query('id') id: number): Promise<void> {
    return this.timeScheduleService.remove(id);
  }

  @ApiOperation({ summary: 'Получить текущую пару' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseNowTimeSchedule })
  @Get('timetable.getNowTimeSchedule')
  async getNow(): Promise<ResponseNowTimeSchedule> {
    return this.timeScheduleService.getNowSchedule();
  }
}