import { Module } from '@nestjs/common';
import { LecturerTimetableController } from "../controllers/lecturer-timetable.controller";
import { LecturerTimetableService } from "../services";

@Module({
  controllers: [LecturerTimetableController],
  providers: [LecturerTimetableService],
  exports: [LecturerTimetableService]
})
export class LecturerTimetableModule {}