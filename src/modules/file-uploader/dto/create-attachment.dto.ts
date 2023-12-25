import { ApiProperty } from "@nestjs/swagger";
import { IsMimeType, IsNotEmpty, IsOptional} from "class-validator";
import { AttachmentType } from "../../../common/enums/file/attachmentType.enum";
import { CreateFileMediaDto } from "./create-file-media.dto";

export class CreateAttachmentDto {
    @ApiProperty({ description: 'Тип вложения' })
    type: AttachmentType;

    @IsOptional()
    @ApiProperty({ description: 'ID файла медиа', type: CreateFileMediaDto })
    media?: CreateFileMediaDto;

    @ApiProperty({ type: 'string', format: 'binary', description: "Файл вложения" })
    @IsNotEmpty()
    @IsMimeType()
    file: any;
}