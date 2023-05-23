import { Module } from '@nestjs/common';
import { LecturerTimetableController } from "../controllers/lecturer-timetable.controller";
import { LecturerTimetableService } from "../services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lecturer } from "../../../database/entities/timetable/lecturer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer])],
  controllers: [LecturerTimetableController],
  providers: [LecturerTimetableService],
  exports: [LecturerTimetableService]
})
export class LecturerTimetableModule {}