import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { SessionModule } from "./modules/session/session.module";
import { RoleModule } from "./modules/role/role.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { join } from "path";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { ResponseExceptionFilter } from "./common/filters/response-exception.filter";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";

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
    })
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
    }
  ]
})
export class AppModule {
}