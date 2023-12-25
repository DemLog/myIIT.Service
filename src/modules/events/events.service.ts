import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseEventsDto } from './dto/response-events.dto';
import { ResponseEventDto } from './dto/response-event.dto';
import { EventVote } from '../../database/entities/events/event-vote.entity';
import { Event } from '../../database/entities/events/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDto } from './dto/edit-event.dto';
import { Profile } from '../../database/entities/profile/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploaderService } from '../file-uploader/file-uploader.service';
import { File } from '../../database/entities/file/file.entity';
import { ResponseEventVoteDto } from './dto/response-event-vote.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(EventVote)
        private readonly eventVoteRepository: Repository<EventVote>,
        private readonly fileUploaderService: FileUploaderService
    ) { }

    async findAll(): Promise<ResponseEventsDto[]> {
        return this.eventRepository.find()
    }

    async findAllVote(profile: Profile): Promise<ResponseEventVoteDto[]> {
        const votes = await this.eventVoteRepository.find({ where: { profile: { id: profile.id } }, relations: { event: true } });
        console.log(votes)
        const response: ResponseEventVoteDto[] = [];
        for (let i = 0; i < votes.length; i++) {
            response.push({
                status: votes[i].status,
                event: votes[i].event.id
            })
        }
        return response;
    }

    async findOne(id: number): Promise<ResponseEventDto> {
        return this.getEvent(id);
    }

    async getEvent(id: number): Promise<Event> {
        const profile = await this.eventRepository.findOne({ where: { id } });
        if (!profile) {
            throw new HttpException("Мероприятие не найдено", HttpStatus.NOT_FOUND);
        }
        return profile;
    }

    async getEventVote(id: number): Promise<EventVote> {
        const profile = await this.eventVoteRepository.findOne({ where: { id }, relations: { event: true, profile: true } });
        if (!profile) {
            throw new HttpException("Голос не найден", HttpStatus.NOT_FOUND);
        }
        return profile;
    }

    async create(createEventDto: CreateEventDto, file?: Express.Multer.File): Promise<ResponseEventDto> {
        let photo: File;
        if (file) {
            photo = await this.fileUploaderService.uploadMedia(file, {}, null);
        }
        const event = await this.eventRepository.create(createEventDto);
        event.photo = photo.url ?? null;
        return this.eventRepository.save(event);
    }

    async update(id: number, editEventDto: EditEventDto): Promise<ResponseEventDto> {
        const event = await this.getEvent(id);
        await this.eventRepository.merge(event, editEventDto);
        return this.eventRepository.save(event);

    }

    async remove(id: number): Promise<void> {
        const event = await this.getEvent(id);
        await this.eventRepository.remove(event);
    }

    async addVote(id: number, status: boolean, prifile: Profile): Promise<void> {
        const event = await this.getEvent(id);
        const eventVote = await this.eventVoteRepository.create({
            status: true,
            event: event,
            profile: prifile
        });
        await this.eventVoteRepository.save(eventVote);
    }

    async deleteVote(id: number, profile: Profile): Promise<void> {
        const eventVote = await this.eventVoteRepository.findOne({ where: { event: { id }, profile: { id: profile.id } } });
        await this.eventVoteRepository.remove(eventVote);
    }
}
