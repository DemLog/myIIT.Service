import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ProfileType } from "../../common/enums/profile-type.enum";
import { Session } from "./session.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'first_name', nullable: true })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  @ApiProperty()
  lastName: string;

  @Column({ name: 'email', nullable: true })
  @ApiProperty()
  email: string;

  @Column({ name: 'country', nullable: true })
  @ApiProperty()
  country: string;

  @Column({ name: 'city', nullable: true })
  @ApiProperty()
  city: string;

  @Column({ name: 'status', nullable: true })
  @ApiProperty()
  status: string;

  @Column({ name: 'study_group', nullable: true })
  @ApiProperty()
  studyGroup: string;

  @Column({ name: 'study_direction', nullable: true })
  @ApiProperty()
  studyDirection: string;

  @Column({ name: 'profile', nullable: true })
  @ApiProperty()
  profile: string;

  @Column({ name: 'patronymic', nullable: true })
  @ApiProperty()
  patronymic: string;

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty()
  avatar: string;

  @Column({ name: 'type', default: ProfileType.User })
  @ApiProperty({ enum: ProfileType, default: ProfileType.User })
  type: ProfileType;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Session, (session) => session.profile)
  sessions: Session[];

  @OneToMany(() => Role, (role) => role.users)
  roles: Role[];
}
