import { ApiProperty } from '@nestjs/swagger';

export class ResponseProfileInfoDto {
  @ApiProperty({ example: 'Зачислен', description: 'Статус пользователя' })
  studyStatus?: string;

  @ApiProperty({ example: 'ПрИ-202', description: 'Учебная группа пользователя' })
  studyGroup?: string;

  @ApiProperty({ example: '09.03.04 Программная инженерия', description: 'Направление обучения пользователя' })
  studyDirection?: string;

  @ApiProperty({ example: 'Инженерия программного обеспечения', description: 'Профиль обучения' })
  studyProfile?: string;

  @ApiProperty({ example: 'Доцент', description: 'Должность сотрудника' })
  position?: string;
}