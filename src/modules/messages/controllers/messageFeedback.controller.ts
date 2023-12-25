import { Body, Controller, Get, Post, Query, } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseFeedbackDto } from "../dto/feedback/response-feedback.dto";
import { CreateFeedbackDto } from "../dto/feedback/create-feedback.dto";
import { MessageFeedbackService } from "../services/messageFeedback.service";

@ApiTags('Messages: Feedback')
@ApiBearerAuth()
@Controller()
export class MessageFeedbackController {

    constructor(
        private readonly messageFeedbackService: MessageFeedbackService
    ) {}

    @ApiOperation({ summary: 'Получить тикет обратной связи' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseFeedbackDto })
    @Get("message.getFeedback")
    async get(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<ResponseFeedbackDto> {
        return this.messageFeedbackService.findOne(id, currentUser);
    }

    @ApiOperation({ summary: 'Получить все тикеты обратной связи' })
    @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseFeedbackDto] })
    @Get("message.getFeedbackAll")
    async getAll(@CurrentUser() currentUser: Profile): Promise<ResponseFeedbackDto[]> {
        return this.messageFeedbackService.findAll(currentUser);
    }

    @ApiOperation({ summary: 'Создать тикет обратной связи' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseFeedbackDto })
    @ApiBody({ type: CreateFeedbackDto })
    @Post("message.createFeedback")
    async sendBroadcast(@Body() createFeedback: CreateFeedbackDto, @CurrentUser() currentUser: Profile): Promise<ResponseFeedbackDto> {
        return this.messageFeedbackService.create(createFeedback, currentUser);
    }
}