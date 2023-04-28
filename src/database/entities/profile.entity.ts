import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from './auth.entity';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'email' })
  @ApiProperty()
  email: string;

  @Column({ name: 'country' })
  @ApiProperty()
  country: string;

  @Column({ name: 'city' })
  @ApiProperty()
  city: string;

  @Column({ name: 'status' })
  @ApiProperty()
  status: string;

  @Column({ name: 'study_group' })
  @ApiProperty()
  studyGroup: string;

  @Column({ name: 'study_direction' })
  @ApiProperty()
  studyDirection: string;

  @Column({ name: 'profile' })
  @ApiProperty()
  profile: string;

  @Column({ name: 'patronymic' })
  @ApiProperty()
  patronymic: string;

  @Column({ name: 'avatar' })
  @ApiProperty()
  avatar: string;

  @OneToOne(() => Auth, (auth) => auth.profile)
  auth: Auth;
}
