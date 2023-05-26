import { DataSource } from "typeorm";
import { PermissionDefault } from "../../common/enums/users/permission.enum";
import { RolePermission } from "../entities/users/role-permission.entity";

export default class RolePermissionsCreateSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);

    for (const permission of Object.values(PermissionDefault)) {
      const rolePermission = new RolePermission();
      rolePermission.name = permission.toString();

      await rolePermissionRepository.save(rolePermission);
    }
  }
}