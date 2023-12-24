import { DataSource, In } from "typeorm";
import { RolePermission } from "../entities/role/role-permission.entity";
import { Role } from "../entities/role/role.entity";
import { PermissionApp } from "../../common/enums/role/permission.enum";

const defaultOwnerPermissions = [
  PermissionApp.OWNER_ALL
];

const defaultUserPermissions = [
  PermissionApp.AUTH_CREATE,
  PermissionApp.AUTH_READ_UPDATE,
  PermissionApp.PROFILE_READ_UPDATE,
  PermissionApp.PROFILE_INFO_READ_UPDATE,
  PermissionApp.SESSION_CREATE,
  PermissionApp.SESSION_READ,
  PermissionApp.SESSION_DELETE,
  PermissionApp.ROLE_READ,
  PermissionApp.ROLE_PERMISSION_READ,
  PermissionApp.FILE_CREATE,
  PermissionApp.FILE_READ,
  PermissionApp.FILE_DELETE,
  PermissionApp.FILE_MEDIA_CREATE,
  PermissionApp.FILE_MEDIA_READ,
  PermissionApp.FILE_MEDIA_DELETE,
  PermissionApp.ATTACHMENT_CREATE,
  PermissionApp.ATTACHMENT_READ,
  PermissionApp.ATTACHMENT_DELETE,
  PermissionApp.TIMETABLE_READ,
  PermissionApp.TIMETABLE_LECTURER_READ,
  PermissionApp.TIMETABLE_SCHEDULE_READ,
  PermissionApp.TIMETABLE_SUBJECT_READ,
  PermissionApp.NOTIFICATION_READ,
  PermissionApp.MESSAGE_CREATE,
  PermissionApp.MESSAGE_READ_UPDATE_DELETE,
  PermissionApp.MESSAGE_CONVERSATION_CREATE,
  PermissionApp.MESSAGE_CONVERSATION_READ_UPDATE_DELETE,
  PermissionApp.EVENT_READ
];

const defaultStudentPermissions = [
  PermissionApp.MESSAGE_CHAT_CREATE,
  PermissionApp.MESSAGE_CHAT_READ_UPDATE_DELETE,
  PermissionApp.MESSAGE_CHANNEL_READ,
  PermissionApp.MESSAGE_FEEDBACK_CREATE,
  PermissionApp.MESSAGE_FEEDBACK_READ,
  PermissionApp.EVENT_VOTE_ALL
];

const defaultTeacherPermissions = [
  PermissionApp.TIMETABLE_UPDATE,
  PermissionApp.NOTIFICATION_CREATE,
  PermissionApp.MESSAGE_CHAT_CREATE,
  PermissionApp.MESSAGE_CHAT_READ_UPDATE_DELETE,
  PermissionApp.MESSAGE_CHANNEL_READ_UPDATE
];

const defaultEmployeePermissions = [
  PermissionApp.PROFILE_ALL,
  PermissionApp.PROFILE_INFO_ALL,
  PermissionApp.ROLE_ALL,
  PermissionApp.TIMETABLE_ALL,
  PermissionApp.TIMETABLE_LECTURER_ALL,
  PermissionApp.TIMETABLE_SCHEDULE_ALL,
  PermissionApp.TIMETABLE_SUBJECT_ALL,
  PermissionApp.NOTIFICATION_ALL,
  PermissionApp.MESSAGE_CHAT_ALL,
  PermissionApp.MESSAGE_CHANNEL_ALL,
  PermissionApp.MESSAGE_FEEDBACK_ALL,
  PermissionApp.EVENT_ALL
];

export default class RoleDefaultCreateSeed {
  async run(dataSource: DataSource): Promise<void> {
    const rolePermissionRepository = dataSource.getRepository(RolePermission);
    const roleRepository = dataSource.getRepository(Role);

    const adminRole = new Role();
    adminRole.name = "Администратор";
    adminRole.description = "Роль администратора сервиса с полными правами";
    adminRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultOwnerPermissions) }
    });
    await roleRepository.save(adminRole);

    const userRole = new Role();
    userRole.name = "Пользователь";
    userRole.description = "Роль пользователя";
    userRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultUserPermissions) }
    });
    await roleRepository.save(userRole);

    const studentRole = new Role();
    userRole.name = "Студент";
    userRole.description = "Роль студента";
    userRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultStudentPermissions) }
    });
    await roleRepository.save(userRole);

    const teacherRole = new Role();
    userRole.name = "Преподаватель";
    userRole.description = "Роль преподавателя";
    userRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultTeacherPermissions) }
    });
    await roleRepository.save(userRole);

    const employeeRole = new Role();
    userRole.name = "Сотрудник";
    userRole.description = "Роль сотрудника факультета (деканат)";
    userRole.permissions = await rolePermissionRepository.find({
      where: { name: In(defaultEmployeePermissions) }
    });
    await roleRepository.save(userRole);
  }
}
