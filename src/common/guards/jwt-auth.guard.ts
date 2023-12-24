import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ProfileService } from "../../modules/profile/profile.service";
import { SessionService } from "../../modules/session/session.service";
import { WsException } from "@nestjs/websockets";
import { Profile } from "../../database/entities/profile/profile.entity";
import { Role } from "../../database/entities/role/role.entity";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly profileService: ProfileService,
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isWs = context.getType() === 'ws';
    const request = isWs ? context.switchToWs().getClient() : context.switchToHttp().getRequest();

    if (isWs) {
      await this.validateWsRequest(request);
    } else {
      await this.validateHttpRequest(request, context);
    }
    return true;
  }

  private async validateWsRequest(request: any): Promise<void> {
    const token = request.handshake?.query?.token as string;

    if (!token) {
      throw new WsException("Пользователь не авторизован");
    }

    const decodedToken = this.validateToken(token, request.handshake?.address);
    const profileId = decodedToken.profileId;

    this.checkTokenExpiration(decodedToken.exp, token);
    await this.checkIpMatching(decodedToken.ipAddress, request.handshake?.address);

    let lastToken = await this.cacheManager.get<string>(`session:${profileId}`);
    if (!lastToken || lastToken !== token) {
      await this.checkSessionAndCache(profileId, token);
    }

    let profile: Profile = await this.getCachedProfile(profileId);
    let permissions: string[] = await this.getCachedPermissions(profileId);
    if (!profile || !permissions) {
      profile = await this.profileService.getProfile(profileId);
      permissions = this.getProfilePermissions(profile);
      await this.cacheManager.set(`profile_permissions:${profileId}`, permissions);
    }

    request.user = profile;
    request.permissions = permissions;
    request.token = token;
  }

  private async validateHttpRequest(request: any, context: ExecutionContext): Promise<void> {
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
    if (isPublic) {
      return;
    }

    const authHeader = request.headers.authorization;
    const [bearer, token] = this.extractBearerAndToken(authHeader);

    this.checkAuthorizationHeader(bearer, token);

    const decodedToken = this.validateToken(token, request.ip);
    const profileId = decodedToken.profileId;

    this.checkTokenExpiration(decodedToken.exp, token);
    await this.checkIpMatching(decodedToken.ipAddress, request.ip);

    let lastToken = await this.cacheManager.get<string>(`session:${profileId}`);
    if (!lastToken || lastToken !== token) {
      await this.checkSessionAndCache(profileId, token);
    }

    let profile: Profile = await this.getCachedProfile(profileId);
    let permissions: string[] = await this.getCachedPermissions(profileId);
    if (!profile || !permissions) {
      profile = await this.profileService.getProfile(profileId);
      permissions = this.getProfilePermissions(profile);
      await this.cacheManager.set(`profile_permissions:${profileId}`, permissions);
    }

    request.user = profile;
    request.permissions = permissions;
    request.token = token;
  }

  private extractBearerAndToken(authHeader: string): [string, string] {
    const [bearer, token] = authHeader.split(" ");
    return [bearer, token];
  }

  private validateToken(token: string, ipAddress: string): { exp: number; profileId: number; ipAddress: string } {
    const decodedToken = this.jwtService.decode(token) as { exp: number; profileId: number; ipAddress: string };
    if (!decodedToken) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    if (decodedToken.ipAddress !== ipAddress) {
      throw new HttpException("Доступ запрещен. IP адрес не совпадает", HttpStatus.UNAUTHORIZED);
    }
    return decodedToken;
  }

  private checkTokenExpiration(exp: number, token: string): void {
    if (exp <= Math.floor(Date.now() / 1000)) {
      this.sessionService.removeSessionByToken(token);
      throw new HttpException("Время сеанса истекло", HttpStatus.UNAUTHORIZED);
    }
  }

  private async checkIpMatching(decodedIp: string, userIp: string): Promise<void> {
    if (decodedIp !== userIp) {
      throw new HttpException("Доступ запрещен. IP адрес не совпадает", HttpStatus.UNAUTHORIZED);
    }
  }

  private async checkSessionAndCache(profileId: number, token: string): Promise<void> {
    const sessionExists = await this.sessionService.checkSession(token);
    if (!sessionExists) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }
    await this.cacheManager.set(`session:${profileId}`, token);
  }

  private async getCachedProfile(profileId: number): Promise<Profile> {
    return await this.cacheManager.get<Profile>(`profile:${profileId}`);
  }

  private async getCachedPermissions(profileId: number): Promise<string[]> {
    return await this.cacheManager.get<string[]>(`profile_permissions:${profileId}`);
  }

  private getProfilePermissions(profile: Profile): string[] {
    return profile.roles.flatMap((role: Role) => role.permissions.map((permission) => permission.name));
  }

  private checkAuthorizationHeader(bearer: string, token: string): void {
    if (bearer !== "Bearer" || !token) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }
  }
}
