import { Controller, Get, Delete, Post, Put, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEventsDto } from './dto/response-events.dto';
import { ResponseEventDto } from './dto/response-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDto } from './dto/edit-event.dto';
import { EventsService } from './events.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Profile } from '../../database/entities/profile/profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseEventVoteDto } from './dto/response-event-vote.dto';

@ApiTags("Events")
@ApiBearerAuth()
@Controller()
export class EventsController {
    constructor(
        private readonly eventService: EventsService
    ) { }

    @ApiOperation({ summary: "Проголосовать" })
    @ApiResponse({ status: 200 })
    @Get("events.addVore")
    async addVote(@Query("id") id: number, @Query("status") status: boolean, @CurrentUser() currentUser: Profile): Promise<void> {
        console.log(status);
        return this.eventService.addVote(id, status, currentUser);
    }

    @ApiOperation({ summary: "Отменить голос" })
    @ApiResponse({ status: 200 })
    @Delete("events.removeVote")
    async removeProfileFromRole(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.eventService.deleteVote(id, currentUser);
    }

    @ApiOperation({ summary: "Получить все мероприятия" })
    @ApiResponse({ status: 200, type: [ResponseEventsDto] })
    @Get("events.getAll")
    async findAll(): Promise<ResponseEventsDto[]> {
        return this.eventService.findAll();
    }

    @ApiOperation({ summary: "Получить все голоса" })
    @ApiResponse({ status: 200, type: [ResponseEventVoteDto] })
    @Get("events.getAllVotes")
    async findAllVotes(@CurrentUser() currentUser: Profile): Promise<ResponseEventVoteDto[]> {
        return this.eventService.findAllVote(currentUser);
    }

    @ApiOperation({ summary: "Получить все архивные мероприятия" })
    @ApiResponse({ status: 200, type: [ResponseEventsDto] })
    @Get("events.getArchive")
    async findAllArchive(): Promise<ResponseEventsDto[]> {
        return this.eventService.findAll();
    }

    @ApiOperation({ summary: "Получить мероприятие по ID" })
    @ApiResponse({ status: 200, type: ResponseEventDto })
    @Get("events.get")
    async findOne(@Query("id") id: number): Promise<ResponseEventDto> {
        return this.eventService.findOne(id);
    }

    @ApiOperation({ summary: "Создать мероприятие" })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: 201, type: ResponseEventDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 6 * 1024 * 1024
        }
    }))
    @Post("events.create")
    async create(@Body() createEventDto: CreateEventDto, @UploadedFile() file?: Express.Multer.File): Promise<ResponseEventDto> {
        return this.eventService.create(createEventDto, file);
    }

    @ApiOperation({ summary: "Изменить мероприятие" })
    @ApiBody({ type: EditEventDto })
    @ApiResponse({ status: 200, type: ResponseEventDto })
    @Put("events.edit")
    async update(@Query("id") id: number, @Body() editEvent: EditEventDto): Promise<ResponseEventDto> {
        return this.eventService.update(id, editEvent);
    }

    @ApiOperation({ summary: "Удалить мероприятие" })
    @ApiResponse({ status: 204 })
    @Delete("events.delete")
    async remove(@Query("id") id: number): Promise<void> {
        return this.eventService.remove(id);
    }
}

