import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseChannelDto } from "../dto/channel/response-channel.dto";
import { SendChannelBroadcastDto } from "../dto/channel/send-channel-broadcast.dto";

@ApiTags('Messages: Channel')
@ApiBearerAuth()
@Controller()
export class MessageChannelController {

    // @ApiOperation({ summary: 'Получить канал' })
    // @ApiResponse({ status: 200, description: 'Успешно', type: ResponseChannelDto })
    // @Get("message.getChannel")
    // async get(@Query('id') id: number, @CurrentUser() currentUser: Profile): Promise<ResponseChannelDto> {

    // }

    // @ApiOperation({ summary: 'Получить все каналы' })
    // @ApiResponse({ status: 200, description: 'Успешно', type: [ResponseChannelDto] })
    // @Get("message.getChannelAll")
    // async getAll(@CurrentUser() currentUser: Profile): Promise<ResponseChannelDto[]> {

    // }

    // @ApiOperation({ summary: 'Отправить сообщение во все каналы' })
    // @ApiResponse({ status: 201, description: 'Успешно' })
    // @ApiBody({ type: SendChannelBroadcastDto })
    // @Post("message.sendChannelAll")
    // async sendBroadcast(@Body() sendChannelBroadcastDto: SendChannelBroadcastDto, @CurrentUser() currentUser: Profile): Promise<void> {

    // }
}