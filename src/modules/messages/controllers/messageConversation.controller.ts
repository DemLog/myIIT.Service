import { Controller, Delete, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseConversationDto } from "../dto/conversation/response-conversation.dto";
import { MessageConversationService } from "../services/messageConversation.service";

@ApiTags('Messages: Conversation')
@ApiBearerAuth()
@Controller()
export class MessageConversationController {

    constructor(
        private readonly messageConversationService: MessageConversationService
    ) {}

    @ApiOperation({ summary: 'Получить диалог' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseConversationDto })
    @Get("message.getConversation")
    async get(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<ResponseConversationDto> {
        return this.messageConversationService.findOne(id, currentUser);
    }

    @ApiOperation({ summary: 'Получить все диалоги пользователя' })
    @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseConversationDto] })
    @Get("message.getConversation")
    async getAll(@CurrentUser() currentUser: Profile): Promise<ResponseConversationDto[]> {
        return this.messageConversationService.findAll(currentUser);
    }

    @ApiOperation({ summary: 'Удалить диалог' })
    @ApiResponse({ status: 204, description: 'Успешно' })
    @Delete("message.deleteConversation")
    async delete(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<void> {
        this.messageConversationService.remove(id, currentUser);
    }

    @ApiOperation({ summary: 'Получить диалог с пользователем' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseConversationDto })
    @Get("message.getUserChat")
    async getUserChat(@Query("peerId") peerId: number, @CurrentUser() currentUser: Profile): Promise<ResponseConversationDto> {
        return this.messageConversationService.getUserChat(peerId, currentUser);
    }
}