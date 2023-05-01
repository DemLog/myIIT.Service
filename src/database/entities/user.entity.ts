import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile.entity';

@Entity({ name: 'auth' })
export class Auth {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'login', unique: true })
  login: string;

  @ApiProperty()
  @Column({ name: 'password', select: false })
  password: string;

  @ApiProperty()
  @Column({ name: 'moodle_consent', default: false })
  moodleConsent: boolean;

  @ApiProperty({ type: () => Profile })
  @OneToOne(() => Profile, (profile) => profile.auth)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
