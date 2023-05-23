import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionDefault } from "../enums/permission.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndMerge<PermissionDefault[]>('permissions', [context.getClass(), context.getHandler()]);

    if (requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userPermissions: string[] = request.permissions;

    return userPermissions.some((permissionUser) =>
      requiredPermissions.some((permissionMethod) =>
        permissionMethod.toString() === permissionUser || PermissionDefault.PERMISSION_ALL.toString() === permissionUser
      )
    );
  }
}