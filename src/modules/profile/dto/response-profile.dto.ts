import { ApiProperty } from '@nestjs/swagger';
import { RoleListDto } from "../../role/dto/role-list.dto";

export class ResponseProfileDto {
  @ApiProperty({ example: '1', description: 'Индентификатор профиля пользователя' })
  id: number;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  lastName?: string;

  @ApiProperty({ example: 'john.doe@mail.com', description: 'Адрес электронной почты пользователя' })
  email?: string;

  @ApiProperty({ example: 'USA', description: 'Страна пользователя' })
  country?: string;

  @ApiProperty({ example: 'New York', description: 'Город пользователя' })
  city?: string;

  @ApiProperty({ example: 'Зачислен', description: 'Статус пользователя' })
  status?: string;

  @ApiProperty({ example: 'ПрИ-202', description: 'Учебная группа пользователя' })
  studyGroup?: string;

  @ApiProperty({ example: '09.03.04 Программная инженерия', description: 'Направление обучения пользователя' })
  studyDirection?: string;

  @ApiProperty({ example: 'Инженерия программного обеспечения', description: 'Профиль обучения' })
  profile?: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  patronymic?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL адрес аватара пользователя' })
  avatar?: string;

  @ApiProperty({ type: [RoleListDto], description: 'Список ролей пользователя' })
  roles: RoleListDto[];
}