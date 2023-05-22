import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LecturerTimetableService } from "../services";
import { CreateLecturerDto } from "../dto/lecturer/create-lecturer.dto";
import { ResponseLecturerDto } from "../dto/lecturer/response-lecturer.dto";
import { UpdateLecturerDto } from "../dto/lecturer/update-lecturer.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('timetable/lecturer')
@ApiBearerAuth()
@Controller('timetable/lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerTimetableService) {}

  @ApiOperation({ summary: 'Создать преподавателя' })
  @ApiResponse({ status: 201, description: 'Успешно', type: ResponseLecturerDto })
  @Post()
  async create(@Body() createLecturerDto: CreateLecturerDto): Promise<ResponseLecturerDto> {
    return this.lecturerService.create(createLecturerDto);
  }

  @ApiOperation({ summary: 'Получить список преподавателей' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseLecturerDto] })
  @Get()
  async findAll(): Promise<ResponseLecturerDto[]> {
    return this.lecturerService.findAll();
  }

  @ApiOperation({ summary: 'Получить преподавателя по ID' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseLecturerDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseLecturerDto> {
    return this.lecturerService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить преподавателя' })
  @ApiResponse({ status: 200, description: 'Успешно', type: ResponseLecturerDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLecturerDto: UpdateLecturerDto,
  ): Promise<ResponseLecturerDto> {
    return this.lecturerService.update(id, updateLecturerDto);
  }

  @ApiOperation({ summary: 'Удалить преподавателя' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.lecturerService.remove(id);
  }
}
