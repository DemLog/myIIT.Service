import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSessionDto } from "./dto/create-session.dto";
import { ResponseCreateSessionDto } from "./dto/response-create-session.dto";
import { SessionDto } from "./dto/session.dto";
import { SessionService } from "./session.service";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { Permission } from "../../common/enums/permission.enum";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Profile } from "../../database/entities/profile.entity";
import { CurrentUserPermissions } from "../../common/decorators/current-user-permissions.decorator";

@ApiTags("sessions")
@ApiBearerAuth()
@Permissions(Permission.SESSION_ALL)
@Controller("sessions")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  @ApiOperation({ summary: "Создание сессии" })
  @ApiOkResponse({ type: ResponseCreateSessionDto })
  @ApiResponse({ status: 400, description: "Некорректные данные для создания сессии" })
  @Permissions(Permission.SESSION_CREATE)
  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<ResponseCreateSessionDto> {
    return await this.sessionService.createSession(createSessionDto);
  }

  @ApiOperation({ summary: "Удаление одной сессии" })
  @ApiResponse({ status: 200, description: "Сессия удалена" })
  @ApiResponse({ status: 404, description: "Сессия не найдена" })
  @Permissions(Permission.SESSION_DELETE, Permission.SESSION_READ_UPDATE_DELETE)
  @Post("logout")
  async removeSession(
    @Query("sessionId") sessionId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<void> {
    const session = await this.sessionService.getSession(sessionId);
    if (session.profile.id !== currentUser.id && !currentUserPermissions.includes(Permission.SESSION_ALL.toString())) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    await this.sessionService.removeSession(sessionId);
  }

  @ApiOperation({ summary: "Удаление всех сессий пользователя" })
  @ApiResponse({ status: 200, description: "Все сессии пользователя удалены" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  @ApiQuery({name: "profileId", type: Number, required: false, allowEmptyValue: true})
  @Permissions(Permission.SESSION_DELETE, Permission.SESSION_READ_UPDATE_DELETE)
  @Delete()
  async removeAllSessions(
    @Query("profileId") profileId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<void> {
    if (!profileId) {
      profileId = currentUser.id;
    }

    const hasFullAccess = currentUserPermissions.includes(Permission.SESSION_ALL.toString()) || currentUserPermissions.includes(Permission.PERMISSION_ALL.toString());
    if (profileId !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    await this.sessionService.removeAllSessions(profileId);
  }

  @ApiOperation({ summary: "Получение всех сессий пользователя" })
  @ApiResponse({ status: 200, type: SessionDto, isArray: true, description: "Список сессий пользователя" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  @ApiQuery({name: "profileId", type: Number, required: false, allowEmptyValue: true})
  @Permissions(Permission.SESSION_READ, Permission.SESSION_READ_UPDATE, Permission.SESSION_READ_UPDATE_DELETE)
  @Get()
  async getAllSessions(
    @Query("profileId") profileId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<SessionDto[]> {
    if (!profileId) {
      profileId = currentUser.id;
    }

    const hasFullAccess = currentUserPermissions.includes(Permission.SESSION_ALL.toString()) || currentUserPermissions.includes(Permission.PERMISSION_ALL.toString());
    if (profileId !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    return await this.sessionService.getAllSessions(profileId);
  }
}