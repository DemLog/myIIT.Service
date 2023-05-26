import { DataSource } from "typeorm";
import { RolePermission } from "../entities/users/role-permission.entity";
import { PermissionTimeTable } from "../../common/enums/users/permission.enum";

export default class RolePermissionsStudyCreateSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);

    for (const permission of Object.values(PermissionTimeTable)) {
      const rolePermission = new RolePermission();
      rolePermission.name = permission.toString();

      await rolePermissionRepository.save(rolePermission);
    }
  }
}