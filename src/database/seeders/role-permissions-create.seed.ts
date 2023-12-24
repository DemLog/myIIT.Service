import { DataSource } from "typeorm";
import { RolePermission } from "../entities/role/role-permission.entity";
import { PermissionApp } from "src/common/enums/role/permission.enum";

export default class RolePermissionsCreateSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);

    for (const permission of Object.values(PermissionApp)) {
      const rolePermission = new RolePermission();
      rolePermission.name = permission.toString();

      await rolePermissionRepository.save(rolePermission);
    }
  }
}