import { Module } from '@nestjs/common';
import { LessonScheduleService } from "../services";
import { LessonScheduleController } from "../controllers/lesson-schedule.controller";

@Module({
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService],
  exports: [LessonScheduleService]
})
export class LessonScheduleModule {}