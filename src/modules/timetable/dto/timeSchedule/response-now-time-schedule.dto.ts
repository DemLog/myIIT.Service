import { ApiProperty } from "@nestjs/swagger";

export class ResponseNowTimeSchedule {
    @ApiProperty({ description: 'Идентификатор роли' })
    id: number;

    @ApiProperty({ description: "Номер пары" })
    number?: number;

    @ApiProperty({ description: "Время начала пары", type: Date })
    startTime?: Date;

    @ApiProperty({ description: "Время конца занятия", type: Date })
    endTime?: Date;

    @ApiProperty({ description: "Идет пара или нет?" })
    status: boolean;
}