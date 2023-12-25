import { ApiProperty } from "@nestjs/swagger";
import { AttachmentType } from "../../../common/enums/file/attachmentType.enum";

export class ResponseAttachmentDto {
    @ApiProperty({ description: 'Тип вложения' })
    type: AttachmentType;

    @ApiProperty({ description: 'URL файла', example: "/dfgsfgfsgfsg.jpg" })
    url: string;
}