import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceInfo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  profileId: number;
}