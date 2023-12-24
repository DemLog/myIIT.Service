import { Subgroup } from "../../../../common/enums/timetable/subgroup.enum";
import { DayWeek } from "../../../../common/enums/timetable/dayWeek.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonScheduleDto {
  @ApiProperty({ description: "Уникальный индентификатор занятия" })
  subject: number;

  @ApiProperty({ description: "Учебные группы" })
  groups: number[];

  @ApiProperty({ description: "Четная или нечетная учебная неделя", default: false })
  isEvenWeek: boolean;

  @ApiProperty({ description: "Преподаватели" })
  lecture: number[];

  @ApiProperty({ description: "Кабинет" })
  cabinet: string;

  @ApiProperty({ description: "День недели", enum: DayWeek, default: DayWeek.Monday })
  dayWeek: DayWeek;

  @ApiProperty({ description: 'Номер подруппы', enum: Subgroup, default: Subgroup.All })
  subgroup: Subgroup;

  @ApiProperty({ description: "Время занятия" })
  time: number;
}