import { SetMetadata } from "@nestjs/common";
import { PermissionDefault } from "../enums/users/permission.enum";

export const Permissions = (...permissions: PermissionDefault[]) => SetMetadata('permissions', permissions);