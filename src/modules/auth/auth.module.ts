import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ProfileModule } from "../profile/profile.module";
import { SessionModule } from "../session/session.module";
import { RoleModule } from "../role/role.module";
import { Auth } from "../../database/entities/auth/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
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