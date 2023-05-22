import { Module } from '@nestjs/common';
import { LecturerTimetableModule } from "./modules/lecturer-timetable.module";
import { TimeScheduleModule } from "./modules/time-schedule.module";
import { SubjectTimetableModule } from "./modules/subject-timetable.module";
import { TimetableController } from './timetable.controller';
import { LessonScheduleModule } from "./modules/lesson-schedule.module";

@Module({
  imports: [LecturerTimetableModule, TimeScheduleModule, SubjectTimetableModule, LessonScheduleModule],
  controllers: [TimetableController],
  providers: [],
  exports: []
})
export class TimetableModule {}
