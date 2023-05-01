import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "./profile.entity";

@Entity({ name: "session" })
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: "device_info" })
  @ApiProperty()
  deviceInfo: string;

  @Column({ name: "ip_address" })
  @ApiProperty()
  ipAddress: string;

  @Column({ name: "jwt_token" })
  @ApiProperty()
  jwtToken: string;

  @ManyToOne(() => Profile, (profile) => profile.sessions)
  @ApiProperty()
  profile: Profile;
}