import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/LoginDto";
import { UserTokenDto } from "./dto/UserTokenDto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<UserTokenDto> {
    const token = await this.authService.authenticate(loginDto);
    return token;
  }
}