import { Module } from '@nestjs/common';
import { TimeScheduleService } from "../services";
import { TimeScheduleController } from "../controllers/time-schedule.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimetableSchedule } from "../../../database/entities/timetable/timetable-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TimetableSchedule])],
  controllers: [TimeScheduleController],
  providers: [TimeScheduleService],
  exports: [TimeScheduleService]
})
export class TimeScheduleModule {}