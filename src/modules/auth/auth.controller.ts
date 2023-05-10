import { Body, Controller, Ip, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { Public } from "../../common/decorators/public.decorator";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiBearerAuth()
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ipAddress: string,
    @Req() req: Request,
  ): Promise<ResponseLoginDto> {
    const userAgent = req.headers['user-agent'];
    return await this.authService.login(loginDto, ipAddress, userAgent);
  }

  @Public()
  @Post('login/save')
  @ApiOperation({ summary: 'Сохранение пароля пользователя' })
  @ApiBearerAuth()
  async savePassword(
    @Body() loginDto: LoginDto,
  ): Promise<void> {
    await this.authService.savePassword(loginDto);
  }
}