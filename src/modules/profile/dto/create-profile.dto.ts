import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ProfileType } from "../../../common/enums/users/profileType.enum";

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  lastName?: string;

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
  @ApiProperty({ example: 'Зачислен', description: 'Статус пользователя' })
  status?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'ПрИ-202', description: 'Учебная группа пользователя' })
  studyGroup?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '09.03.04 Программная инженерия', description: 'Направление обучения пользователя' })
  studyDirection?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Инженерия программного обеспечения', description: 'Профиль обучения' })
  profile?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  patronymic?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL адрес аватара пользователя' })
  avatar?: string;

  @IsOptional()
  @ApiProperty({ enum: ProfileType, example: ProfileType.User, description: 'Тип профиля пользователя' })
  profileType?: ProfileType;
}