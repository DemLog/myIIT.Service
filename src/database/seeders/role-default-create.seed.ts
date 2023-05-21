import { DataSource, In } from "typeorm";
import { Permission } from "../../common/enums/permission.enum";
import { Role } from "../entities/role.entity";
import { RolePermission } from "../entities/role-permission.entity";

const defaultAdminPermissions = [Permission.PERMISSION_ALL];
const defaultUserPermissions = [
  Permission.AUTH_CREATE,
  Permission.PROFILE_READ_UPDATE,
  Permission.SESSION_READ_UPDATE_DELETE,
  Permission.ROLE_READ,
  Permission.ROLE_PERMISSION_READ
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
