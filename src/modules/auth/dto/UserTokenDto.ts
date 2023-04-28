import { ApiProperty } from '@nestjs/swagger';

export class UserTokenDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  moodleConsent: boolean;
}
