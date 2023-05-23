import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TimeScheduleService } from "../services";
import { CreateTimeScheduleDto } from "../dto/timeSchedule/create-time-schedule.dto";
import { ResponseTimeScheduleDto } from "../dto/timeSchedule/response-time-schedule.dto";
import { UpdateTimeScheduleDto } from "../dto/timeSchedule/update-time-schedule.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('timetable/time-schedule')
@ApiBearerAuth()
@Controller('timetable/time-schedule')
export class TimeScheduleController {
  constructor(private readonly timeScheduleService: TimeScheduleService) {}

  @ApiOperation({ summary: 'Создать расписание времени' })
  @ApiResponse({ status: 201, description: 'Успешно', type: ResponseTimeScheduleDto })
  @ApiBody({type: CreateTimeScheduleDto})
  @Post()
  async create(@Body() createTimeScheduleDto: CreateTimeScheduleDto): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.create(createTimeScheduleDto);
  }

  @ApiOperation({ summary: 'Получить список расписаний времени' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseTimeScheduleDto] })
  @Get()
  async findAll(): Promise<ResponseTimeScheduleDto[]> {
    return this.timeScheduleService.findAll();
  }

  @ApiOperation({ summary: 'Получить расписание времени по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseTimeScheduleDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить расписание времени' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseTimeScheduleDto })
  @ApiBody({type: UpdateTimeScheduleDto})
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTimeScheduleDto: UpdateTimeScheduleDto,
  ): Promise<ResponseTimeScheduleDto> {
    return this.timeScheduleService.update(id, updateTimeScheduleDto);
  }

  @ApiOperation({ summary: 'Удалить расписание времени' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.timeScheduleService.remove(id);
  }
}