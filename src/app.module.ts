import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { config } from 'dotenv';
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

const envFilePath = join(process.cwd(), 'src', 'config', 'env', '.env.development');
const envConfig = config({ path: envFilePath });

if (envConfig.error) {
  throw new Error(`Unable to load environment variables from ${envFilePath}: ${envConfig.error}`);
}

@Module({
  imports: [DatabaseModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [],
  providers: [],
})
export class AppModule {}