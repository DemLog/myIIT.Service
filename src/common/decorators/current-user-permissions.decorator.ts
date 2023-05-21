import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserPermissions = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.permissions;
  },
);