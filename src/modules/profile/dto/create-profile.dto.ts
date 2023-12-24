import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ProfileType } from "../../../common/enums/profile/profileType.enum";
import { CreateProfileInfoDto } from './create-profile-info.dto';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  patronymic?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'john.doe@mail.com', description: 'Адрес электронной почты пользователя' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'USA', description: 'Страна пользователя' })
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'New York', description: 'Город пользователя' })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL адрес аватара пользователя' })
  avatar?: string;

  @ApiProperty({ enum: ProfileType, type: ProfileType, example: ProfileType.Student, description: 'Тип профиля (студент, сотрудник, сервисный аккаунт)' })
  profileType: ProfileType;

  @ApiProperty({ type: CreateProfileInfoDto, description: 'Дополнительная информация о профиле' })
  profileInfo: CreateProfileInfoDto;
}