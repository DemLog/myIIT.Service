import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseMessageDto } from "../dto/message/response-message.dto";
import { CreateMessageDto } from "../dto/message/create-message.dto";
import { EditMessageDto } from "../dto/message/edit-message.dto";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MessageService } from "../services/message.service";
import { QueryHistoryMessageDto } from "../dto/query-history-message.dto";

@ApiTags('Messages')
@ApiBearerAuth()
@Controller()
export class MessageController {

    constructor(
        private readonly messageService: MessageService
    ) {}

    // @ApiOperation({ summary: 'Получить последние сообщения' })
    // @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseMessageDto] })
    // @Get("message.get")
    // async get(@CurrentUser() currentUser: Profile): Promise<ResponseMessageDto[]> {

    // }

    @ApiOperation({ summary: 'Отправить сообщение' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseMessageDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('files'))
    @ApiBody({ type: CreateMessageDto })
    @Post("message.send")
    async send(@UploadedFile() files: Express.Multer.File[], @Body() createMessageDto: CreateMessageDto, @CurrentUser() currentUser: Profile): Promise<ResponseMessageDto> {
        return this.messageService.create(files, createMessageDto, currentUser);
    }

    @ApiOperation({ summary: 'Редактировать сообщение' })
    @ApiResponse({ status: 200, description: 'Успешно', type: ResponseMessageDto })
    @ApiBody({ type: EditMessageDto })
    @Put("message.edit")
    async edit(@Query("id") id: number, @Body() editMessageDto: EditMessageDto, @CurrentUser() currentUser: Profile): Promise<ResponseMessageDto> {
        return this.messageService.update(id, editMessageDto, currentUser);
    }

    @ApiOperation({ summary: 'Удаление сообщения' })
    @ApiResponse({ status: 204, description: 'Успешно' })
    @Delete("message.delete")
    async delete(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<void> {
        return this.messageService.remove(id, currentUser);
    }

    @ApiOperation({ summary: 'Получить историю сообщений' })
    @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseMessageDto] })
    @Get("message.getHistory")
    async get(@Query() queryHistoryMessageDto: QueryHistoryMessageDto, @CurrentUser() currentUser: Profile): Promise<ResponseMessageDto[]> {
        return this.messageService.getHistory(queryHistoryMessageDto, currentUser);
    }
}