import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../database/entities/events/event.entity';
import { EventVote } from '../../database/entities/events/event-vote.entity';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventVote]), FileUploaderModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
