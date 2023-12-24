import { Module } from '@nestjs/common';
import { LecturerTimetableController } from "../controllers/lecturer-timetable.controller";
import { LecturerTimetableService } from "../services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimetableLecturer } from "../../../database/entities/timetable/timetable-lecturer.entity";
import { ProfileModule } from '../../../modules/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimetableLecturer]), ProfileModule],
  controllers: [LecturerTimetableController],
  providers: [LecturerTimetableService],
  exports: [LecturerTimetableService]
})
export class LecturerTimetableModule {}