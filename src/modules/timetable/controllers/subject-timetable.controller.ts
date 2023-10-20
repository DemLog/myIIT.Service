import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SubjectTimetableService } from "../services";
import { CreateSubjectDto } from "../dto/subject/create-subject.dto";
import { ResponseSubjectDto } from "../dto/subject/response-subject.dto";
import { UpdateSubjectDto } from "../dto/subject/update-subject.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Timetable: Subject')
@ApiBearerAuth()
@Controller()
export class SubjectTimetableController {
  constructor(private readonly subjectService: SubjectTimetableService) {}

  @ApiOperation({ summary: 'Создать предмет' })
  @ApiResponse({ status: 201, description: 'Успешно', type: ResponseSubjectDto })
  @ApiBody({type: CreateSubjectDto})
  @Post("timetable.createSubject")
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
    return this.subjectService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'Получить список предметов' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseSubjectDto] })
  @Get("timetable.getSubjectAll")
  async findAll(): Promise<ResponseSubjectDto[]> {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'Получить предмет по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseSubjectDto })
  @Get('timetable.getSubject')
  async findOne(@Query('id') id: number): Promise<ResponseSubjectDto> {
    return this.subjectService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить предмет' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseSubjectDto })
  @ApiBody({type: UpdateSubjectDto})
  @Put('timetable.editSubject')
  async update(
    @Query('id') id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<ResponseSubjectDto> {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: 'Удалить предмет' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @Delete('timetable.deleteSubject')
  async remove(@Query('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
