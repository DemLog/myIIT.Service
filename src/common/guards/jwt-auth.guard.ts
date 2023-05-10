import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Проверяем, помечен ли метод декоратором @Public
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest()
    try {
      // Получаем токен из заголовка Authorization
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        // Если заголовок неправильный, выбрасываем исключение HttpException
        throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED)
      }

      // Проверяем токен и добавляем информацию о пользователе в запрос
      request.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      // Если что-то пошло не так, выбрасываем исключение HttpException
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED)
    }
  }
}