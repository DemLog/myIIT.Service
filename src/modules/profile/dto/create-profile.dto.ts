import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ProfileType } from "../../../common/enums/profile-type.enum";

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  status?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  studyGroup?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  studyDirection?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  profile?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  patronymic?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar?: string;

  @IsOptional()
  @ApiProperty({enum: ProfileType})
  profileType?: ProfileType;
}