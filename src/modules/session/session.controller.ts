import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSessionDto } from "./dto/create-session.dto";
import { ResponseCreateSessionDto } from "./dto/response-create-session.dto";
import { SessionDto } from "./dto/session.dto";
import { SessionService } from "./session.service";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { Permission } from "../../common/enums/permission.enum";

@ApiTags('sessions')
@ApiBearerAuth()
@Permissions(Permission.SESSION_ALL)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({ summary: 'Создание сессии' })
  @ApiOkResponse({ type: ResponseCreateSessionDto })
  @ApiResponse({ status: 400, description: 'Некорректные данные для создания сессии' })
  @Permissions(Permission.SESSION_CREATE)
  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<ResponseCreateSessionDto> {
    return await this.sessionService.createSession(createSessionDto);
  }

  @ApiOperation({ summary: 'Удаление одной сессии' })
  @ApiResponse({ status: 200, description: 'Сессия удалена' })
  @ApiResponse({ status: 404, description: 'Сессия не найдена' })
  @Permissions(Permission.SESSION_DELETE, Permission.SESSION_READ_UPDATE_DELETE)
  @Post('logout')
  async removeSession(@Query('sessionId') sessionId: number): Promise<void> {
    await this.sessionService.removeSession(sessionId);
  }

  @ApiOperation({ summary: 'Удаление всех сессий пользователя' })
  @ApiResponse({ status: 200, description: 'Все сессии пользователя удалены' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Permissions(Permission.SESSION_DELETE, Permission.SESSION_READ_UPDATE_DELETE)
  @Delete()
  async removeAllSessions(@Query('profileId') profileId: number): Promise<void> {
    await this.sessionService.removeAllSessions(profileId);
  }

  @ApiOperation({ summary: 'Получение всех сессий пользователя' })
  @ApiResponse({ status: 200, type: SessionDto, isArray: true, description: 'Список сессий пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Permissions(Permission.SESSION_READ, Permission.SESSION_READ_UPDATE, Permission.SESSION_READ_UPDATE_DELETE)
  @Get()
  async getAllSessions(@Query('profileId') profileId: number): Promise<SessionDto[]> {
    return await this.sessionService.getAllSessions(profileId);
  }
}