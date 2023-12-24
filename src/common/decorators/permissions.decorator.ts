import { SetMetadata } from "@nestjs/common";
import { PermissionApp } from "../enums/role/permission.enum";

export const Permissions = (...permissions: PermissionApp[]) => SetMetadata('permissions', permissions);