import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SessionModule } from "./modules/session/session.module";
import { RoleModule } from "./modules/role/role.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { join } from "path";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { ResponseExceptionFilter } from "./common/filters/response-exception.filter";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { RolesGuard } from "./common/guards/roles.guard";
import { FileUploaderModule } from './modules/file-uploader/file-uploader.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { TimetableModule } from "./modules/timetable/timetable.module";
import { NotificationModule } from "./modules/notification/notification.module";
import AdminModule from './modules/admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SessionModule,
    RoleModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), "src", "config", "env", ".env.development")
    },
    ),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          url: `redis://${configService.get<string>("REDIS_HOST")}:${configService.get<number>("REDIS_PORT")}`,
          ttl: 1000 * 60 * 2
        })
      }),
      inject: [ConfigService],
      isGlobal: true
    }),
    TimetableModule,
    FileUploaderModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'uploads'),
      serveRoot: '/uploads',
    }),
    NotificationModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: ResponseExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {
}