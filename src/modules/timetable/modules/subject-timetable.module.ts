import { Module } from '@nestjs/common';
import { SubjectTimetableController } from "../controllers/subject-timetable.controller";
import { SubjectTimetableService } from "../services";

@Module({
  controllers: [SubjectTimetableController],
  providers: [SubjectTimetableService],
  exports: [SubjectTimetableService]
})
export class SubjectTimetableModule {}