import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditProfileDto {
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
}