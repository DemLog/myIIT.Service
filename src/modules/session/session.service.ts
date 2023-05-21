import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSessionDto } from "./dto/create-session.dto";
import { Session } from "../../database/entities/session.entity";
import { ProfileService } from "../profile/profile.service";
import { ResponseCreateSessionDto } from "./dto/response-create-session.dto";
import { SessionDto } from "./dto/session.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async createSession(createSessionDto: CreateSessionDto): Promise<ResponseCreateSessionDto> {
    const { deviceInfo, ipAddress, profileId } = createSessionDto;
    const profile = await this.profileService.findOne(profileId);
    const token = this.jwtService.sign({ profileId: profile.id, deviceInfo: deviceInfo, ipAddress: ipAddress });
    const session = this.sessionRepository.create({ deviceInfo, ipAddress, token: token, profile });
    await this.sessionRepository.save(session);

    return { token, deviceInfo, ipAddress, profileId };
  }

  async getSession(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new HttpException("Сессия не найдена", HttpStatus.NOT_FOUND);
    }
    return session;
  }

  async removeSession(sessionId: number): Promise<void> {
    const session = await this.getSession(sessionId);
    await this.cacheManager.del(`session:${session.profile.id}`);
    await this.sessionRepository.remove(session);
  }

  async removeSessionByToken(token: string): Promise<void> {
    const session = await this.sessionRepository.findOneBy({token});
    if (!session) {
      throw new HttpException("Сессия не найдена", HttpStatus.NOT_FOUND);
    }
    await this.cacheManager.del(`session:${session.profile.id}`);
    await this.sessionRepository.remove(session);
  }

  async checkSession(token: string): Promise<boolean> {
    try {
      const session = await this.sessionRepository.findOneBy({ token });
      return !!session;
    } catch (e) {
      return false;
    }
  }

  async removeAllSessions(profileId: number): Promise<void> {
    await this.sessionRepository.delete({ profile: { id: profileId } });
  }

  async getAllSessions(profileId: number): Promise<SessionDto[]> {
    const sessions = await this.sessionRepository.find({
      where: { profile: { id: profileId } },
      relations: { profile: true }
    });
    return sessions.map(({ id, deviceInfo, ipAddress, profile }) => {
      return {
        id,
        deviceInfo,
        ipAddress,
        profileId: profile.id
      };
    });
  }
}