import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../../database/entities/role.entity";
import { RolePermission } from "../../database/entities/role-permission.entity";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission]), ProfileModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {
}
