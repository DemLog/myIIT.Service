import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseChatDto } from "../dto/chat/response-chat.dto";
import { CreateChatDto } from "../dto/chat/create-chat.dto";
import { EditChatDto } from "../dto/chat/edit-chat.dto";
import { AddUserChatDto } from "../dto/chat/add-user-chat.dto";
import { RemoveUserChatDto } from "../dto/chat/remove-user-chat.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { SetPhotoChatDto } from "../dto/chat/set-photo-chat.dto";
import { MessageChatService } from "../services/messageChat.service";

@ApiTags('Messages: Chat')
@ApiBearerAuth()
@Controller()
export class MessageChatController {

    constructor(
        private readonly messageChatService: MessageChatService
    ) {}

    @ApiOperation({ summary: 'Получить беседу' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseChatDto })
    @Get("message.getChat")
    async get(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<ResponseChatDto> {
        return this.messageChatService.findOne(id, currentUser);
    }

    @ApiOperation({ summary: 'Получить все беседы пользователя' })
    @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseChatDto] })
    @Get("message.getChatAll")
    async getAll(@CurrentUser() currentUser: Profile): Promise<ResponseChatDto[]> {
        return this.messageChatService.findAll(currentUser);
    }

    @ApiOperation({ summary: 'Создать беседу' })
    @ApiResponse({ status: 201, description: 'Успешно', type: ResponseChatDto })
    @ApiBody({ type: CreateChatDto })
    @Post("message.createChat")
    async create(@Body() createChatDto: CreateChatDto, @CurrentUser() currentUser: Profile): Promise<ResponseChatDto> {
        return this.messageChatService.create(createChatDto, currentUser);
    }

    @ApiOperation({ summary: 'Редактировать беседу' })
    @ApiResponse({ status: 201, description: 'Успешно', type: ResponseChatDto })
    @ApiBody({ type: EditChatDto })
    @Put("message.editChat")
    async edit(@Query("id") id: number, @Body() editChatDto: EditChatDto, @CurrentUser() currentUser: Profile): Promise<ResponseChatDto> {
        return this.messageChatService.edit(id, editChatDto, currentUser);
    }

    @ApiOperation({ summary: 'Добавить в беседу пользователя' })
    @ApiResponse({ status: 200, description: 'Успешно' })
    @Get("message.addUserChat")
    async addUserChat(@Query() addUserChatDto: AddUserChatDto, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.messageChatService.addMember(addUserChatDto, currentUser);
    }

    @ApiOperation({ summary: 'Удалить из беседы пользователя' })
    @ApiResponse({ status: 200, description: 'Успешно' })
    @Get("message.addUserChat")
    async removeUserChat(@Query() removeUserChatDto: RemoveUserChatDto, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.messageChatService.removeMember(removeUserChatDto, currentUser);
    }

    @ApiOperation({ summary: 'Установить фото беседы' })
    @ApiResponse({ status: 200, description: 'Успешно' })
    @ApiBody({ type: SetPhotoChatDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 6 * 1024 * 1024
        }
    }))
    @Post("message.setPhotoChat")
    async setPhotoChat(@Query("id") id: number, @UploadedFile() file: Express.Multer.File, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.messageChatService.setPhotoChat(id, file, currentUser);
    }

    @ApiOperation({ summary: 'Удалить фото беседы' })
    @ApiResponse({ status: 200, description: 'Успешно' })
    @Get("message.deletePhotoChat")
    async deletePhotoChat(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.messageChatService.deletePhotoChat(id, currentUser);
    }

    @ApiOperation({ summary: 'Удалить беседу' })
    @ApiResponse({ status: 204, description: 'Успешно' })
    @Delete("message.deleteChat")
    async delete(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<void> {
        this.messageChatService.remove(id, currentUser);
    }
}