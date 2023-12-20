import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { ResponseNotificationDto } from './dto/response-notification.dto';
import { Profile } from "../../database/entities/users/profile.entity";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    @ApiOperation({ summary: "Получить все уведомления" })
    @ApiResponse({ status: 200, type: [ResponseNotificationDto] })
    //   @Permissions()
    @Get("notification.getAllNotification")
    async findAll(): Promise<ResponseNotificationDto[]> {
        return this.notificationService.findAll();
    }

    @ApiOperation({ summary: "Получить уведомление по ID" })
    @ApiParam({ name: "id", type: Number, required: true })
    @ApiResponse({ status: 200, type: ResponseNotificationDto })
    //   @Permissions()
    @Get("notification.getNotification")
    async findOne(@Query("id") id: number): Promise<ResponseNotificationDto> {
        return this.notificationService.findOne(id);
    }

    @ApiOperation({ summary: "Получить уведомления пользователя" })
    @ApiParam({ name: "id", type: Number, required: false, allowEmptyValue: true })
    @ApiResponse({ status: 200, type: [ResponseNotificationDto] })
    //   @Permissions()
    @Get("notification.getNotificationUser")
    async findAllForUser(@Query("id") id: number, @CurrentUser() currentUser: Profile): Promise<ResponseNotificationDto[]> {
        if (!id) {
            id = currentUser.id;
        }
        return this.notificationService.findAllForUser(id);
    }

    @ApiOperation({ summary: "Создать новое уведомление" })
    @ApiBody({ type: CreateNotificationDto })
    @ApiResponse({ status: 201, type: ResponseNotificationDto })
    //   @Permissions()
    @Post("notification.createNotification")
    async create(@Body() createProfileDto: CreateNotificationDto): Promise<ResponseNotificationDto> {
        return this.notificationService.create(createProfileDto);
    }

}
