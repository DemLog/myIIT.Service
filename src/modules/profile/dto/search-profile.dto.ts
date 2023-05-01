import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;
}