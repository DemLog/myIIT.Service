import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Profile } from "../../../../database/entities/profile/profile.entity";

export class ResponseLecturerDto {
  @ApiProperty({ description: 'Идентификатор роли' })
  id: number;

  @ApiProperty({ description: 'Фамилия преподавателя' })
  lastName: string;

  @ApiProperty({ description: 'Имя преподавателя', nullable: true })
  firstName?: string;

  @ApiProperty({ description: 'Отчество преподавателя', nullable: true })
  patronymic?: string;

  @ApiProperty({ description: 'Должность', nullable: true })
  position?: string;

  @ApiProperty({ description: 'Контакт преподавателя', nullable: true })
  contact?: string;

  @ApiProperty({ description: 'Профиль преподавателя', nullable: true })
  profile?: Profile;
}