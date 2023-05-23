import { Module } from '@nestjs/common';
import { TimeScheduleService } from "../services";
import { TimeScheduleController } from "../controllers/time-schedule.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSchedule } from "../../../database/entities/timetable/time-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TimeSchedule])],
  controllers: [TimeScheduleController],
  providers: [TimeScheduleService],
  exports: [TimeScheduleService]
})
export class TimeScheduleModule {}