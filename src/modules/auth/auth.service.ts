import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import { User } from "../../database/entities/profile.entity";
import MoodleService from "../../utils/moodleService";
import { LoginDto } from "./dto/LoginDto";
import { UserTokenDto } from "./dto/UserTokenDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    @InjectRepository(User)
    private profileRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  async authenticate(loginDto: LoginDto): Promise<UserTokenDto | null> {
    let user: User = await this.validateUser(loginDto);

    if (!user) {
      const moodleService = new MoodleService(loginDto.login, loginDto.password);
      const moodleUser = await moodleService.checkAccount();

      const newAuthUser = await this.authRepository.save(
        this.authRepository.create({
          login: loginDto.login,
          password: "",
          moodleConsent: false
        })
      );
      await this.authRepository.save(newAuthUser);
      user = newAuthUser;

      const newProfileUser = await this.profileRepository.save(
        this.profileRepository.create({
          ...moodleUser,
          avatar: "",
          auth: newAuthUser
        })
      );
      await this.profileRepository.save(newProfileUser);
    }

    return this.generateUserToken(user);
  }

  private async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.authRepository.findOne({ where: { login: loginDto.login } });
    if (!user) {
      return null;
    }

    if (!user.moodleConsent) {
      try {
        const moodleService = new MoodleService(loginDto.login, loginDto.password);
        const moodleUser = await moodleService.checkAccount();

        // обновляем профиль пользователя
        await this.profileRepository.update(user.id, moodleUser);

      } catch (e) {
        throw new HttpException(
          "Неправильный логин или пароль.",
          HttpStatus.BAD_REQUEST
        );
      }
    } else {
      if (user.password !== loginDto.password) {
        throw new HttpException(
          "Неправильный логин или пароль.",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    return user;
  }

  private generateUserToken(authData: User): UserTokenDto {
    const payload = { sub: authData.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user_id: authData.id,
      moodleConsent: authData.moodleConsent
    };
  }
}