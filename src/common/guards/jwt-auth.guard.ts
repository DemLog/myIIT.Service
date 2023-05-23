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
import { Profile } from "../../database/entities/users/profile.entity";
import { ProfileService } from "../../modules/profile/profile.service";
import { Role } from "../../database/entities/users/role.entity";
import { SessionService } from "../../modules/session/session.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly profileService: ProfileService,
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Проверяем, помечен ли метод декоратором @Public
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    try {
      // Получаем токен из заголовка Authorization
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        // Если заголовок неправильный, выбрасываем исключение HttpException
        throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
      }

      const decodedToken = this.jwtService.decode(token) as { exp: number; profileId: number; ipAddress: string };
      const profileId = decodedToken.profileId;
      const userIP = request.ip;

      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        await this.sessionService.removeSessionByToken(token);
        throw new HttpException("Время сеанса истекло", HttpStatus.UNAUTHORIZED);
      }

      if (decodedToken.ipAddress !== userIP) {
        throw new HttpException("Доступ запрещен. IP адрес не совпадает", HttpStatus.UNAUTHORIZED);
      }

      let lastToken = await this.cacheManager.get<string>(`session:${profileId}`);
      if (!lastToken || lastToken !== token) {
        const sessionExists = await this.sessionService.checkSession(token);
        if (!sessionExists) {
          throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
        }
        await this.cacheManager.set(`session:${profileId}`, token);
      }

      let profile: Profile = await this.cacheManager.get<Profile>(`profile:${profileId}`);
      let permissions: string[] = await this.cacheManager.get<string[]>(`profile_permissions:${profileId}`);
      if (!profile || !permissions) {
        profile = await this.profileService.getProfile(profileId);
        permissions = profile.roles.flatMap((role: Role) => role.permissions.map((permission) => permission.name));
        await this.cacheManager.set(`profile_permissions:${profileId}`, permissions);
      }
      request.user = profile;
      request.permissions = permissions;

      return true;
    } catch (e) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }
  }
}
