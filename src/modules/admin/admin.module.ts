import AdminJS from 'adminjs';
// без этого `@adminjs/nestjs` по какой-то причине "не видит" `@aminjs/express`, необходимый ему для работы
import '@adminjs/express';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { appDataSource } from '../../database/typeorm-migration.config';

import { Auth } from '../../database/entities/auth/auth.entity';
import { Profile } from '../../database/entities/profile/profile.entity';
import { ProfileInfo } from '../../database/entities/profile/profile-info.entity';
import { Session } from '../../database/entities/session/session.entity';
import { Role } from '../../database/entities/role/role.entity';
import { RolePermission } from '../../database/entities/role/role-permission.entity';
import { Event } from '../../database/entities/events/event.entity';
import { EventVote } from '../../database/entities/events/event-vote.entity';
import { File } from '../../database/entities/file/file.entity';
import { FileMedia } from '../../database/entities/file/file-media.entity';
import { Attachment } from '../../database/entities/file/attachment.entity';
import { Message } from '../../database/entities/messages/message.entity';
import { MessageChannel } from '../../database/entities/messages/message-channel.entity';
import { MessageConversation } from '../../database/entities/messages/message-conversation.entity';
import { MessageChat } from '../../database/entities/messages/message-chat.entity';
import { Notification } from '../../database/entities/notification/notification.entity';
import { Timetable } from '../../database/entities/timetable/timetable.entity';
import { TimetableSchedule } from '../../database/entities/timetable/timetable-schedule.entity';
import { TimetableLecturer } from '../../database/entities/timetable/timetable-lecturer.entity';
import { TimetableSubject } from '../../database/entities/timetable/timetable-subject.entity';

AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

export default AdminModule.createAdmin({
  adminJsOptions: {
    // databases: [appDataSource],
    // путь к админке
    rootPath: '/admin',
    // в этом списке должны быть указаны все модели/таблицы БД,
    // доступные для редактирования
    resources: [
      {resource: Auth}, 
      {resource: Profile},
      {resource: ProfileInfo},
      {resource: Session},
      {resource: Role},
      {resource: RolePermission},
      {resource: Event},
      {resource: EventVote},
      {resource: File},
      {resource: FileMedia},
      {resource: Attachment},
      {resource: Message},
      {resource: MessageChannel},
      {resource: MessageConversation},
      {resource: MessageChat},
      {resource: MessageChannel},
      {resource: Notification},
      {resource: Timetable},
      {resource: TimetableSchedule},
      {resource: TimetableLecturer},
      {resource: TimetableSubject},
    ],
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret'
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
  },
});