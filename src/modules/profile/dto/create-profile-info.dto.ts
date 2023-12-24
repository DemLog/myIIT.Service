import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProfileInfoDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Зачислен', description: 'Статус пользователя' })
  studyStatus?: string;

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
  studyProfile?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Доцент', description: 'Должность сотрудника' })
  position?: string;
}