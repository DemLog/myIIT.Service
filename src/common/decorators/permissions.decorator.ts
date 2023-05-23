import { SetMetadata } from "@nestjs/common";
import { PermissionDefault } from "../enums/permission.enum";

export const Permissions = (...permissions: PermissionDefault[]) => SetMetadata('permissions', permissions);