import { ApiProperty } from "@nestjs/swagger";
import { ProfileType } from "../../../common/enums/profile/profileType.enum";
import { ResponseProfileInfoDto } from "../../../modules/profile/dto/response-profile-info.dto";

export class ProfileMessageDto {
    @ApiProperty({ example: '1', description: 'Индентификатор профиля пользователя' })
    id: number;

    @ApiProperty({ example: 'John', description: 'Имя пользователя' })
    firstName?: string;

    @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
    lastName?: string;

    @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL адрес аватара пользователя' })
    avatar?: string;

    @ApiProperty({ enum: ProfileType, type: ProfileType, example: ProfileType.Student, description: 'Тип профиля (студент, сотрудник, сервисный аккаунт)' })
    profileType: ProfileType;

    @ApiProperty({ type: ResponseProfileInfoDto, description: 'Дополнительная информация о профиле' })
    profileInfo: ResponseProfileInfoDto;
}