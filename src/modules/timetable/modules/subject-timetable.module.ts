import { Module } from '@nestjs/common';
import { SubjectTimetableController } from "../controllers/subject-timetable.controller";
import { SubjectTimetableService } from "../services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimetableSubject } from "../../../database/entities/timetable/timetable-subject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TimetableSubject])],
  controllers: [SubjectTimetableController],
  providers: [SubjectTimetableService],
  exports: [SubjectTimetableService]
})
export class SubjectTimetableModule {}