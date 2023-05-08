import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../../database/entities/user.entity";
import { ProfileModule } from "../profile/profile.module";
import { SessionModule } from "../session/session.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    SessionModule,
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}