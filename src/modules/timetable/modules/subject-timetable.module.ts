import { Module } from '@nestjs/common';
import { SubjectTimetableController } from "../controllers/subject-timetable.controller";
import { SubjectTimetableService } from "../services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "../../../database/entities/timetable/subject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectTimetableController],
  providers: [SubjectTimetableService],
  exports: [SubjectTimetableService]
})
export class SubjectTimetableModule {}