export enum PermissionDefault {
  // Общие разрешения
  PERMISSION_ALL = 'PERMISSION:ALL',
  // Модель Auth
  AUTH_CREATE = 'AUTH:CREATE',
  // модель Profile
  PROFILE_CREATE = 'PROFILE:CREATE',
  PROFILE_READ = 'PROFILE:READ',
  PROFILE_UPDATE = 'PROFILE:UPDATE',
  PROFILE_DELETE = 'PROFILE:DELETE',
  PROFILE_READ_UPDATE = 'PROFILE:READ_UPDATE',
  PROFILE_READ_UPDATE_DELETE = 'PROFILE:READ_UPDATE_DELETE',
  PROFILE_ALL = 'PROFILE:ALL',
  // Модель Session
  SESSION_CREATE = 'SESSION:CREATE',
  SESSION_READ = 'SESSION:READ',
  SESSION_UPDATE = 'SESSION:UPDATE',
  SESSION_DELETE = 'SESSION:DELETE',
  SESSION_READ_UPDATE = 'SESSION:READ_UPDATE',
  SESSION_READ_UPDATE_DELETE = 'SESSION:READ_UPDATE_DELETE',
  SESSION_ALL = 'SESSION:ALL',
  // Модель Role
  ROLE_CREATE = 'ROLE:CREATE',
  ROLE_READ = 'ROLE:READ',
  ROLE_UPDATE = 'ROLE:UPDATE',
  ROLE_DELETE = 'ROLE:DELETE',
  ROLE_READ_UPDATE = 'ROLE:READ_UPDATE',
  ROLE_READ_UPDATE_DELETE = 'ROLE:READ_UPDATE_DELETE',
  ROLE_ALL = 'ROLE:ALL',
  // Модель RolePermission
  ROLE_PERMISSION_CREATE = 'ROLE_PERMISSION:CREATE',
  ROLE_PERMISSION_READ = 'ROLE_PERMISSION:READ',
  ROLE_PERMISSION_UPDATE = 'ROLE_PERMISSION:UPDATE',
  ROLE_PERMISSION_DELETE = 'ROLE_PERMISSION:DELETE',
  ROLE_PERMISSION_READ_UPDATE = 'ROLE_PERMISSION:READ_UPDATE',
  ROLE_PERMISSION_READ_UPDATE_DELETE = 'ROLE_PERMISSION:READ_UPDATE_DELETE',
  ROLE_PERMISSION_ALL = 'ROLE_PERMISSION:ALL',
}

export enum PermissionTimeTable {
  LECTURER_CREATE = 'LECTURER:CREATE',
  LECTURER_READ = 'LECTURER:READ',
  LECTURER_UPDATE = 'LECTURER:UPDATE',
  LECTURER_DELETE = 'LECTURER:DELETE',
  LECTURER_READ_UPDATE = 'LECTURER:READ_UPDATE',
  LECTURER_READ_UPDATE_DELETE = 'LECTURER:READ_UPDATE_DELETE',
  LECTURER_ALL = 'LECTURER:ALL',
  LESSON_SCHEDULE_CREATE = 'LESSON_SCHEDULE:CREATE',
  LESSON_SCHEDULE_READ = 'LESSON_SCHEDULE:READ',
  LESSON_SCHEDULE_UPDATE = 'LESSON_SCHEDULE:UPDATE',
  LESSON_SCHEDULE_DELETE = 'LESSON_SCHEDULE:DELETE',
  LESSON_SCHEDULE_READ_UPDATE = 'LESSON_SCHEDULE:READ_UPDATE',
  LESSON_SCHEDULE_READ_UPDATE_DELETE = 'LESSON_SCHEDULE:READ_UPDATE_DELETE',
  LESSON_SCHEDULE_ALL = 'LESSON_SCHEDULE:ALL',
  SUBJECT_CREATE = 'SUBJECT:CREATE',
  SUBJECT_READ = 'SUBJECT:READ',
  SUBJECT_UPDATE = 'SUBJECT:UPDATE',
  SUBJECT_DELETE = 'SUBJECT:DELETE',
  SUBJECT_READ_UPDATE = 'SUBJECT:READ_UPDATE',
  SUBJECT_READ_UPDATE_DELETE = 'SUBJECT:READ_UPDATE_DELETE',
  SUBJECT_ALL = 'SUBJECT:ALL',
  TIME_SCHEDULE_CREATE = 'TIME_SCHEDULE:CREATE',
  TIME_SCHEDULE_READ = 'TIME_SCHEDULE:READ',
  TIME_SCHEDULE_UPDATE = 'TIME_SCHEDULE:UPDATE',
  TIME_SCHEDULE_DELETE = 'TIME_SCHEDULE:DELETE',
  TIME_SCHEDULE_READ_UPDATE = 'TIME_SCHEDULE:READ_UPDATE',
  TIME_SCHEDULE_READ_UPDATE_DELETE = 'TIME_SCHEDULE:READ_UPDATE_DELETE',
  TIME_SCHEDULE_ALL = 'TIME_SCHEDULE:ALL',
}

export const defaultStudyGroupPermissions = [
  PermissionTimeTable.LECTURER_READ,
  PermissionTimeTable.SUBJECT_READ,
  PermissionTimeTable.TIME_SCHEDULE_READ,
  PermissionTimeTable.LESSON_SCHEDULE_READ
];