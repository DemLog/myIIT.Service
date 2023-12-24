import { Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseSessionDto } from "./dto/response-session.dto";
import { SessionService } from "./session.service";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CurrentUserPermissions } from "../../common/decorators/current-user-permissions.decorator";
import { PermissionApp } from "../../common/enums/role/permission.enum";
import { Profile } from "../../database/entities/profile/profile.entity";

@ApiTags("Sessions")
@ApiBearerAuth()
@Permissions(PermissionApp.SESSION_ALL)
@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  // @ApiOperation({ summary: "Создание сессии" })
  // @ApiOkResponse({ type: ResponseCreateSessionDto })
  // @ApiResponse({ status: 400, description: "Некорректные данные для создания сессии" })
  // @Permissions(PermissionDefault.SESSION_CREATE)
  // @Post("session.createSession")
  // async createSession(@Body() createSessionDto: CreateSessionDto): Promise<ResponseCreateSessionDto> {
  //   return await this.sessionService.createSession(createSessionDto);
  // }

  @ApiOperation({ summary: "Удаление одной сессии" })
  @ApiResponse({ status: 200, description: "Сессия удалена" })
  @ApiResponse({ status: 404, description: "Сессия не найдена" })
  @Permissions(PermissionApp.SESSION_DELETE, PermissionApp.SESSION_READ_UPDATE_DELETE)
  @Post("session.delete")
  async removeSession(
    @Query("sessionId") sessionId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<void> {
    const session = await this.sessionService.getSession(sessionId);
    if (session.profile.id !== currentUser.id && !currentUserPermissions.includes(PermissionApp.SESSION_ALL.toString())) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    await this.sessionService.removeSession(sessionId);
  }

  @ApiOperation({ summary: "Удаление всех сессий пользователя" })
  @ApiResponse({ status: 200, description: "Все сессии пользователя удалены" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  @ApiParam({ name: "profileId", type: Number, required: false, allowEmptyValue: true })
  @Permissions(PermissionApp.SESSION_DELETE, PermissionApp.SESSION_READ_UPDATE_DELETE)
  @Delete("session.deleteAll")
  async removeAllSessions(
    @Query("profileId") profileId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<void> {
    if (!profileId) {
      profileId = currentUser.id;
    }

    const hasFullAccess = currentUserPermissions.includes(PermissionApp.SESSION_ALL.toString()) || currentUserPermissions.includes(PermissionApp.OWNER_ALL.toString());
    if (profileId !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    await this.sessionService.removeAllSessions(profileId);
  }

  @ApiOperation({ summary: "Получение всех сессий пользователя" })
  @ApiResponse({ status: 200, type: [ResponseSessionDto], description: "Список сессий пользователя" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  @Permissions(PermissionApp.SESSION_READ, PermissionApp.SESSION_READ_UPDATE, PermissionApp.SESSION_READ_UPDATE_DELETE)
  @Get("session.getAll")
  async getAllSessions(
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<ResponseSessionDto[]> {
    const profileId = currentUser.id;

    const hasFullAccess = currentUserPermissions.includes(PermissionApp.SESSION_ALL.toString()) || currentUserPermissions.includes(PermissionApp.OWNER_ALL.toString());
    if (profileId !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    return await this.sessionService.getAllSessions(profileId);
  }

  @ApiOperation({ summary: "Получение сессии пользователя" })
  @ApiResponse({ status: 200, type: ResponseSessionDto, description: "Сессия пользователя" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  @ApiQuery({ name: "sessionId", type: Number })
  @Permissions(PermissionApp.SESSION_READ, PermissionApp.SESSION_READ_UPDATE, PermissionApp.SESSION_READ_UPDATE_DELETE)
  @Get("session.get")
  async getSession(
    @Query("sessionId") sessionId: number,
    @CurrentUser() currentUser: Profile,
    @CurrentUserPermissions() currentUserPermissions: string[]
  ): Promise<ResponseSessionDto> {
    const profileId = currentUser.id;

    const hasFullAccess = currentUserPermissions.includes(PermissionApp.SESSION_ALL.toString()) || currentUserPermissions.includes(PermissionApp.OWNER_ALL.toString());
    if (profileId !== currentUser.id && !hasFullAccess) {
      throw new HttpException("Нет доступа на данную операцию", HttpStatus.FORBIDDEN);
    }

    const session = await this.sessionService.getSession(sessionId);
    if (session.profile.id !== profileId) {
      throw new HttpException("Доступ запрещен!", HttpStatus.FORBIDDEN);
    }
    return {...session, profileId: session.profile.id};
  }
}