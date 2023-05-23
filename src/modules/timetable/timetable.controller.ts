import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LessonScheduleService } from "./services";
import { ResponseLessonScheduleDto } from "./dto/lessonSchedule/response-lesson-schedule.dto";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Profile } from "../../database/entities/profile.entity";

const STUDENT_GROUPS = ["ПрИ", "БИ", "ПИ"];

@ApiTags('timetable')
@ApiBearerAuth()
@Controller('timetable')
export class TimetableController {
  constructor(
    private readonly lessonScheduleService: LessonScheduleService
  ) {}

  private getGroupName(currentUser: Profile): string {
    const role = currentUser.roles.find((r) =>
      STUDENT_GROUPS.some((group) => r.name.startsWith(group))
    );

    if (!role) {
      throw new HttpException("Вы не принадлежите ни одной ученической группе", HttpStatus.FORBIDDEN);
    }

    return role.name;
  }

  @ApiOperation({ summary: 'Получить расписание на сегодня для группы' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseLessonScheduleDto] })
  @ApiQuery({ name: "group", type: String, required: false, allowEmptyValue: true })
  @Get('today')
  async getTodayScheduleForGroup(
    @Query('group') groupName: string,
    @CurrentUser() currentUser: Profile
  ): Promise<ResponseLessonScheduleDto[]> {
    if (!groupName) {
      groupName = this.getGroupName(currentUser);
    }

    return this.lessonScheduleService.getTodayScheduleForGroup(groupName);
  }

  @ApiOperation({ summary: 'Получить недельное расписание для группы' })
  @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseLessonScheduleDto] })
  @ApiQuery({ name: "group", type: String, required: false, allowEmptyValue: true })
  @ApiQuery({ name: "is-even-week", type: Boolean, required: false, allowEmptyValue: true })
  @Get('weekly')
  async getWeeklyScheduleForGroup(
    @Query('group') groupName: string,
    @Query('is-even-week') isEvenWeek: boolean,
    @CurrentUser() currentUser: Profile
  ): Promise<ResponseLessonScheduleDto[]> {
    if (!groupName) {
      groupName = this.getGroupName(currentUser);
    }

    if (isEvenWeek === undefined) {
      isEvenWeek = this.lessonScheduleService.isEvenWeek(new Date());
    }

    return this.lessonScheduleService.getWeeklyScheduleForGroup(groupName, isEvenWeek);
  }
}
