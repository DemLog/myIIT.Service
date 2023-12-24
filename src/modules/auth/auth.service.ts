import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileService } from "../profile/profile.service";
import { SessionService } from "../session/session.service";
import { LoginDto } from "./dto/login.dto";
import { ProfileType } from "../../common/enums/profile/profileType.enum";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { CreateProfileDto } from "../profile/dto/create-profile.dto";
import { RoleService } from "../role/role.service";
import { Auth } from "../../database/entities/auth/auth.entity";
import { Role } from "../../database/entities/role/role.entity";
import { SavePasswordDto } from "./dto/save-password.dto";
import { encryptData } from "../../utils/crypto/crypto.service";
import { authSecretKey } from "../../config/secret.config";
import { CreateProfileInfoDto } from "../profile/dto/create-profile-info.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,
    private readonly profileService: ProfileService,
    private readonly sessionService: SessionService,
    private readonly roleService: RoleService
  ) {
  }

  async login(loginDto: LoginDto, ipAddress: string, userAgent: string): Promise<ResponseLoginDto> {
    let user = await this.findUserByLogin(loginDto.login);

    // if (user && user.moodleConsent && loginDto.password === user.password) {
    //   const session = await this.sessionService.createSession({
    //     deviceInfo: userAgent,
    //     ipAddress,
    //     profileId: user.profile.id
    //   });

    //   return { token: session.token, moodleConsent: user.moodleConsent, userId: user.id };
    // }

    const moodleUserProfile = await this.fetchMoodleUserProfile(loginDto);

    if (!user) {
      const profileTypeCheck = moodleUserProfile.studyGroup ? ProfileType.Student : ProfileType.Employee;

      const userProfileInfo: CreateProfileInfoDto = {
        studyGroup: moodleUserProfile.studyGroup,
        studyDirection: moodleUserProfile.studyDirection,
        studyProfile: moodleUserProfile.profile,
        studyStatus: moodleUserProfile.status
      };

      const userProfile: CreateProfileDto = {
        ...moodleUserProfile,
        profileType: profileTypeCheck,
        profileInfo: userProfileInfo
      };

      const createUserProfile = await this.profileService.create(userProfile);
      console.log(createUserProfile);
      const userRole = await this.roleService.findRoleByName("Пользователь");
      console.log(userRole);
      await this.profileService.addProfileToRole({ id: createUserProfile.id, roleId: userRole.id });

      if (createUserProfile.profileInfo.studyGroup) {
        let studentRole: Role;

        try {
          studentRole = await this.roleService.findRoleByName(createUserProfile.profileInfo.studyGroup);
        } catch (e) {
          studentRole = await this.roleService.createStudentRole(createUserProfile.profileInfo.studyGroup);
        } finally {
          await this.profileService.addProfileToRole({ id: createUserProfile.id, roleId: studentRole.id });
        }
      } else {
        let teacherRole: Role;

        teacherRole = await this.roleService.findRoleByName("Преподаватель");
        await this.profileService.addProfileToRole({ id: createUserProfile.id, roleId: teacherRole.id });
      }

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

  async logout(token: string): Promise<void> {
    await this.sessionService.removeSessionByToken(token);
  }

  async savePassword(savePasswordDto: SavePasswordDto): Promise<void> {
    await this.fetchMoodleUserProfile(savePasswordDto);

    const user = await this.findUserByLogin(savePasswordDto.login);
    if (user.password) {
      throw new HttpException("Пароль уже сохранен в системе", HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = encryptData(savePasswordDto.password + savePasswordDto.pinCode, authSecretKey);

    await this.userRepository.update(user.id, {
      password: encryptedPassword,
      moodleConsent: true
    });
  }

  async getUser(id: number): Promise<Auth> {
    return await this.userRepository.findOne({ where: { id }, relations: { profile: true } });
  }

  private async fetchMoodleUserProfile(loginDto: LoginDto): Promise<IUserProfileMoodle> {
    const url = "http://localhost:5000/";
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

  private async findUserByLogin(login: string): Promise<Auth | null> {
    return this.userRepository.findOne({ where: { login }, relations: { profile: true } });
  }
}