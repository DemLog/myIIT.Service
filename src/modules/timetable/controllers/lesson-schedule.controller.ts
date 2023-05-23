import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { LessonScheduleService } from "../services";
import { CreateLessonScheduleDto } from "../dto/lessonSchedule/create-lesson-schedule.dto";
import { ResponseLessonScheduleDto } from "../dto/lessonSchedule/response-lesson-schedule.dto";
import { UpdateLessonScheduleDto } from "../dto/lessonSchedule/update-lesson-schedule.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('timetable/lesson-schedule')
@ApiBearerAuth()
@Controller('timetable/lesson-schedule')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  @ApiOperation({ summary: 'Создать расписание занятия' })
  @ApiResponse({ status: 201, description: 'Успешно', type: ResponseLessonScheduleDto })
  @ApiBody({type: CreateLessonScheduleDto})
  @Post()
  async create(@Body() createLessonScheduleDto: CreateLessonScheduleDto): Promise<ResponseLessonScheduleDto> {
    return this.lessonScheduleService.create(createLessonScheduleDto);
  }

  @ApiOperation({ summary: 'Получить список всех занятий' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseLessonScheduleDto] })
  @Get()
  async findAll(): Promise<ResponseLessonScheduleDto[]> {
    return this.lessonScheduleService.findAll();
  }

  @ApiOperation({ summary: 'Получить занятие по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseLessonScheduleDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseLessonScheduleDto> {
    return this.lessonScheduleService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить занятие' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseLessonScheduleDto })
  @ApiBody({type: UpdateLessonScheduleDto})
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLessonScheduleDto: UpdateLessonScheduleDto,
  ): Promise<ResponseLessonScheduleDto> {
    return this.lessonScheduleService.update(id, updateLessonScheduleDto);
  }
}
