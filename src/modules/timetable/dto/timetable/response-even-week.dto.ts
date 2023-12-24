import { ApiProperty } from "@nestjs/swagger";

export class ResponseEvenWeek {

    @ApiProperty({description: "Номер недели"})
    isEvenWeek: boolean;
}