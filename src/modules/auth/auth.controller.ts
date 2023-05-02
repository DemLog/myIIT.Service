import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ipAddress: string,
    @Req() req: Request,
  ): Promise<any> {
    const userAgent = req.headers['user-agent'];
    return this.authService.login(loginDto, ipAddress, userAgent);
  }

  @Post('password')
  async savePassword(
    @Body('login') login: string,
    @Body('password') password: string,
  ): Promise<void> {
    await this.authService.savePassword(login, password);
  }
}