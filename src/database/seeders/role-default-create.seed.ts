import { DataSource, In } from "typeorm";
import { PermissionDefault } from "../../common/enums/permission.enum";
import { Role } from "../entities/role.entity";
import { RolePermission } from "../entities/role-permission.entity";

const defaultAdminPermissions = [PermissionDefault.PERMISSION_ALL];
const defaultUserPermissions = [
  PermissionDefault.AUTH_CREATE,
  PermissionDefault.PROFILE_READ_UPDATE,
  PermissionDefault.SESSION_READ_UPDATE_DELETE,
  PermissionDefault.ROLE_READ,
  PermissionDefault.ROLE_PERMISSION_READ
];

export default class RoleDefaultCreateSeed {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);
    const roleRepository = dataSource.getRepository(Role);

    const adminRole = new Role();
    adminRole.name = "Администратор";
    adminRole.description = "Роль администратора сервиса с полными правами";
    adminRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultAdminPermissions) }
    });
    await roleRepository.save(adminRole);

    const userRole = new Role();
    userRole.name = "Пользователь";
    userRole.description = "Роль пользователя";
    userRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultUserPermissions) }
    });
    await roleRepository.save(userRole);
  }
}
