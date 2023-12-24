import { ApiProperty } from '@nestjs/swagger';
import { RoleListDto } from "../../role/dto/role-list.dto";
import { ProfileType } from 'src/common/enums/profile/profileType.enum';
import { ResponseProfileInfoDto } from './response-profile-info.dto';

export class ResponseProfileDto {
  @ApiProperty({ example: '1', description: 'Индентификатор профиля пользователя' })
  id: number;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  lastName?: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  patronymic?: string;

  @ApiProperty({ example: 'john.doe@mail.com', description: 'Адрес электронной почты пользователя' })
  email?: string;

  @ApiProperty({ example: 'USA', description: 'Страна пользователя' })
  country?: string;

  @ApiProperty({ example: 'New York', description: 'Город пользователя' })
  city?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL адрес аватара пользователя' })
  avatar?: string;

  @ApiProperty({ enum: ProfileType, type: ProfileType, example: ProfileType.Student, description: 'Тип профиля (студент, сотрудник, сервисный аккаунт)' })
  profileType: ProfileType;

  @ApiProperty({ type: ResponseProfileInfoDto, description: 'Дополнительная информация о профиле' })
  profileInfo: ResponseProfileInfoDto;

  @ApiProperty({ type: [RoleListDto], description: 'Список ролей пользователя' })
  roles: RoleListDto[];
}