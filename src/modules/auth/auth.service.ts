import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileService } from "../profile/profile.service";
import { SessionService } from "../session/session.service";
import { LoginDto } from "./dto/LoginDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import MoodleService from "../../utils/moodleService";
import { ProfileType } from "../../common/enums/profile-type.enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly sessionService: SessionService,
  ) {}

  async login(loginDto: LoginDto, ipAddress: string, userAgent: string): Promise<any> {
    const moodleService = new MoodleService(loginDto.login, loginDto.password);
    const moodleUser = await moodleService.checkAccount();

    let user = await this.checkUser(loginDto.login);

    if (!user) {
      const createProfile = await this.profileService.create({
        ...moodleUser,
        profileType: ProfileType.User
      });
      const createUser = this.userRepository.create({
        login: loginDto.login,
        password: null,
        profile: createProfile
      });
      await this.userRepository.save(createUser);
      user = createUser;
    }

    const token = await this.sessionService.createSession({
      deviceInfo: userAgent,
      ipAddress,
      profileId: user.profile.id,
    });

    return { token, moodleConsent: user.moodleConsent, userId: user.id };
  }

  async savePassword(login: string, password: string): Promise<void> {
    const moodleService = new MoodleService(login, password);
    const moodleUser = await moodleService.checkAccount();

    if (!moodleUser) {
      throw new HttpException('Invalid Moodle credentials', HttpStatus.BAD_REQUEST);
    }

    const user = await this.checkUser(login);

    if (user.password) {
      throw new HttpException('Password already saved', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(user.id, {
      password,
      moodleConsent: true
    })
  }

  private async checkUser(login: string): Promise<User | null> {
    return this.userRepository.findOne({where: {login}});
  }
}