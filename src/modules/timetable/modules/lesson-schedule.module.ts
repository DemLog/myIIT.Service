import { Module } from '@nestjs/common';
import { LessonScheduleService } from "../services";
import { LessonScheduleController } from "../controllers/lesson-schedule.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonSchedule } from "../../../database/entities/timetable/lesson-schedule.entity";
import { RoleModule } from "../../role/role.module";
import { LecturerTimetableModule } from "./lecturer-timetable.module";
import { SubjectTimetableModule } from "./subject-timetable.module";
import { TimeScheduleModule } from "./time-schedule.module";

@Module({
  imports: [TypeOrmModule.forFeature([LessonSchedule]), RoleModule, LecturerTimetableModule, SubjectTimetableModule, TimeScheduleModule],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService],
  exports: [LessonScheduleService]
})
export class LessonScheduleModule {}