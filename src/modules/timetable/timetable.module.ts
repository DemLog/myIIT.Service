import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { LecturerTimetableService } from "./services";

@Module({
  controllers: [TimetableController],
  providers: [LecturerTimetableService],
  exports: [LecturerTimetableService]
})
export class TimetableModule {}
