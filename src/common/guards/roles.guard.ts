import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionApp } from "../enums/role/permission.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndMerge<PermissionApp[]>('permissions', [context.getClass(), context.getHandler()]);

    if (requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userPermissions: string[] = request.permissions;

    return userPermissions.some((permissionUser) =>
      requiredPermissions.some((permissionMethod) =>
        permissionMethod.toString() === permissionUser || PermissionApp.OWNER_ALL.toString() === permissionUser
      )
    );
  }
}