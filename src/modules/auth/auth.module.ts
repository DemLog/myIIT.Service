import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../../database/entities/users/user.entity";
import { ProfileModule } from "../profile/profile.module";
import { SessionModule } from "../session/session.module";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    SessionModule,
    RoleModule
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}