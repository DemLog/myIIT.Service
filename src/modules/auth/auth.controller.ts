import { Body, Controller, Get, HttpException, HttpStatus, Ip, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { Public } from "../../common/decorators/public.decorator";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { PermissionApp } from "../../common/enums/role/permission.enum";
import { SavePasswordDto } from "./dto/save-password.dto";
import { CurrentUserToken } from "../../common/decorators/current-user-token.decorator";
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, type: ResponseLoginDto })
  @Post('auth.login')
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ipAddress: string,
    @Req() req: Request,
  ): Promise<ResponseLoginDto> {
    const userAgent = req.headers['user-agent'];
    return await this.authService.login(loginDto, ipAddress, userAgent);
  }

  @ApiBearerAuth()
  @Get('auth.logout')
  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiResponse({ status: 200 })
  async logout(@CurrentUserToken() token: string): Promise<void> {
    if (!token) {
      throw new HttpException("Вы не авторизованы в системе!", HttpStatus.UNAUTHORIZED);
    }
    await this.authService.logout(token);
  }

  @ApiBearerAuth()
  @Post('auth.savePassword')
  @ApiOperation({ summary: 'Сохранение пароля пользователя' })
  @ApiResponse({ status: 201 })
  async savePassword(@Body() savePasswordDto: SavePasswordDto,): Promise<void> {
    await this.authService.savePassword(savePasswordDto);
  }
}