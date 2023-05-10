import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileService } from "../profile/profile.service";
import { SessionService } from "../session/session.service";
import { LoginDto } from "./dto/login.dto";
import { User } from "../../database/entities/user.entity";
import { ProfileType } from "../../common/enums/profileType.enum";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { CreateProfileDto } from "../profile/dto/create-profile.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly sessionService: SessionService
  ) {
  }

  async login(loginDto: LoginDto, ipAddress: string, userAgent: string): Promise<ResponseLoginDto> {
    let user = await this.findUserByLogin(loginDto.login);
    if (user && user.moodleConsent && loginDto.password === user.password) {
      const session = await this.sessionService.createSession({
        deviceInfo: userAgent,
        ipAddress,
        profileId: user.profile.id
      });

      return { token: session.token, moodleConsent: user.moodleConsent, userId: user.id };
    }

    const moodleUserProfile = await this.fetchMoodleUserProfile(loginDto);

    if (!user) {
      const userProfile: CreateProfileDto = {
        ...moodleUserProfile,
        profileType: ProfileType.User
      };

      const createUserProfile = await this.profileService.create(userProfile);

      const createUser = this.userRepository.create({
        login: loginDto.login,
        password: null,
        profile: createUserProfile
      });
      await this.userRepository.save(createUser);

      user = createUser;
    }

    const session = await this.sessionService.createSession({
      deviceInfo: userAgent,
      ipAddress,
      profileId: user.profile.id
    });

    return { token: session.token, moodleConsent: user.moodleConsent, userId: user.id };
  }

  async savePassword(loginDto: LoginDto): Promise<void> {
    await this.fetchMoodleUserProfile(loginDto);

    const user = await this.findUserByLogin(loginDto.login);
    if (user.password) {
      throw new HttpException("Пароль уже сохранен в системе", HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(user.id, {
      password: loginDto.password,
      moodleConsent: true
    });
  }

  private async fetchMoodleUserProfile(loginDto: LoginDto): Promise<IUserProfileMoodle> {
    const url = "http://127.0.0.1:5000/";
    const params = { username: loginDto.login, password: loginDto.password };

    try {
      const response = await axios.get(url, { params });
      if (response?.data?.error_message) {
        throw new HttpException(response.data.error_message, HttpStatus.BAD_REQUEST);
      }
      return response.data as IUserProfileMoodle;
    } catch (error) {
      throw new HttpException("Ошибка при взаимодействии с Moodle IIT", HttpStatus.BAD_REQUEST);
    }
  }

  private async findUserByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { login }, relations: ["profile"] });
  }
}