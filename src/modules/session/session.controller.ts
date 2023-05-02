import { Body, Controller, Delete, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<{ token: string }> {
    const token = await this.sessionService.createSession(createSessionDto);
    return { token };
  }

  @Post('logout')
  async removeSession(@Query('sessionId') sessionId: number): Promise<void> {
    await this.sessionService.removeSession(sessionId);
  }

  @Delete()
  async removeAllSessions(@Query('profileId') profileId: number): Promise<void> {
    await this.sessionService.removeAllSessions(profileId);
  }

  @Get()
  async getAllSessions(@Query('profileId') profileId: number): Promise<{ sessions: any[] }> {
    const sessions = await this.sessionService.getAllSessions(profileId);
    return { sessions };
  }
}