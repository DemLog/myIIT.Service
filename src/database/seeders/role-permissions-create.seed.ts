import { DataSource } from "typeorm";
import { Permission } from "../../common/enums/permission.enum";
import { RolePermission } from "../entities/role-permission.entity";

export default class RolePermissionsCreateSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);

    for (const permission of Object.values(Permission)) {
      const rolePermission = new RolePermission();
      rolePermission.name = permission.toString();

      await rolePermissionRepository.save(rolePermission);
    }
  }
}