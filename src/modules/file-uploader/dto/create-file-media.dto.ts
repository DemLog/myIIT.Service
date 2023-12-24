import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateFileMediaDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Описание медиа-файла', example: 'example' })
    caption?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Ссылка на миниатюру', example: 'https://example.com' })
    thumbnail?: string;
}