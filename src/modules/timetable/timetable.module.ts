import { Module } from '@nestjs/common';
import { LecturerTimetableModule } from "./modules/lecturer-timetable.module";
import { TimeScheduleModule } from "./modules/time-schedule.module";
import { SubjectTimetableModule } from "./modules/subject-timetable.module";

@Module({
  imports: [LecturerTimetableModule, TimeScheduleModule, SubjectTimetableModule],
  controllers: [],
  providers: [],
  exports: []
})
export class TimetableModule {}
