import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { SessionModule } from './modules/session/session.module';
import { RoleModule } from './modules/role/role.module';
import { ProfileModule } from './modules/profile/profile.module';
import { join } from "path";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SessionModule,
    RoleModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'src', 'config', 'env', '.env.development')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}