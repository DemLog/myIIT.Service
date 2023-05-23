import { ApiProperty } from "@nestjs/swagger";
import { ResponseSubjectDto } from "../subject/response-subject.dto";
import { RoleListDto } from "../../../role/dto/role-list.dto";
import { ResponseLecturerDto } from "../lecturer/response-lecturer.dto";
import { DayWeek } from "../../../../common/enums/dayWeek.enum";
import { ResponseTimeScheduleDto } from "../timeSchedule/response-time-schedule.dto";

export class ResponseLessonScheduleDto {
  @ApiProperty({ description: "Идентификатор роли" })
  id: number;

  @ApiProperty({ description: "Название предмета", type: () => ResponseSubjectDto })
  subject: ResponseSubjectDto;

  @ApiProperty({ description: "Учебные группы", type: () => [RoleListDto] })
  groups: RoleListDto[];

  @ApiProperty({ description: 'Четная или нечетная учебная неделя', default: false })
  isEvenWeek: boolean;

  @ApiProperty({ description: "Преподаватели", type: () => [ResponseLecturerDto] })
  lecture: ResponseLecturerDto[];

  @ApiProperty({ description: 'Кабинет' })
  cabinet: string;

  @ApiProperty({ description: 'День недели', enum: DayWeek, default: DayWeek.Monday })
  dayWeek: DayWeek;

  @ApiProperty({ description: "Время занятия", type: () => ResponseTimeScheduleDto})
  time: ResponseTimeScheduleDto;
}