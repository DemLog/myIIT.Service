import { Module } from '@nestjs/common';
import { LecturerModule } from "./modules/lecturer.module";

@Module({
  imports: [LecturerModule],
  controllers: [],
  providers: [],
  exports: []
})
export class TimetableModule {}
