import { Module } from '@nestjs/common';
import { TimeScheduleService } from "../services";
import { TimeScheduleController } from "../controllers/time-schedule.controller";

@Module({
  controllers: [TimeScheduleController],
  providers: [TimeScheduleService],
  exports: [TimeScheduleService]
})
export class TimeScheduleModule {}