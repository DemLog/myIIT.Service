import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../../database/entities/user.entity";
import { Profile } from "../../database/entities/profile.entity";
import { ProfileService } from "../profile/profile.service";
import { SessionService } from "../session/session.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [AuthService, ProfileService, SessionService],
  controllers: [AuthController],
})
export class AuthModule {}