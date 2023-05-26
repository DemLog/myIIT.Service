import { Body, Controller, Ip, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { Public } from "../../common/decorators/public.decorator";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { PermissionDefault } from "../../common/enums/users/permission.enum";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
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
  @Permissions(PermissionDefault.AUTH_CREATE)
  @Post('login/save')
  @ApiOperation({ summary: 'Сохранение пароля пользователя' })
  async savePassword(
    @Body() loginDto: LoginDto,
  ): Promise<void> {
    await this.authService.savePassword(loginDto);
  }
}