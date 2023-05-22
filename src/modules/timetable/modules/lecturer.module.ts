import { Module } from '@nestjs/common';
import { LecturerController } from "../controllers/lecturer.controller";
import { LecturerTimetableService } from "../services";

@Module({
  controllers: [LecturerController],
  providers: [LecturerTimetableService],
  exports: [LecturerTimetableService]
})
export class LecturerModule {}