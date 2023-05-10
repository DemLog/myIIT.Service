import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ example: 'iPhone 12', description: 'Информация об устройстве' })
  @IsString()
  @IsNotEmpty()
  deviceInfo: string;

  @ApiProperty({ example: '192.168.1.100', description: 'IP-адрес' })
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @ApiProperty({ example: 1, description: 'ID профиля' })
  @IsNotEmpty()
  profileId: number;
}
