import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from '../../database/entities/session.entity';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<string> {
    const { deviceInfo, ipAddress, profileId } = createSessionDto;
    const profile = await this.profileService.findOne(profileId);
    const session = this.sessionRepository.create({ deviceInfo, ipAddress, profile });
    const savedSession = await this.sessionRepository.save(session);

    const token = this.jwtService.sign({ sessionId: savedSession.id });
    savedSession.jwtToken = token;

    await this.sessionRepository.save(savedSession);

    return token;
  }

  async removeSession(sessionId: number): Promise<void> {
    const session = await this.sessionRepository.findOne({where: {id: sessionId}});
    if (!session) {
      throw new HttpException('Сессия не найдена', HttpStatus.NOT_FOUND);
    }
    await this.sessionRepository.remove(session);
  }

  async checkSession(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      const session = await this.sessionRepository.findOne(decoded.sessionId);
      return !!session;
    } catch (e) {
      return false;
    }
  }

  async removeAllSessions(profileId: number): Promise<void> {
    await this.sessionRepository.delete({ profile: { id: profileId } });
  }

  async getAllSessions(profileId: number): Promise<Session[]> {
    return await this.sessionRepository.find({ where: { profile: { id: profileId } } });
  }
}