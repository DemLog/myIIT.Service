import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

config({ path: join(process.cwd(), 'src', 'config', 'env', '.database.env') });
const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST', 'localhost'),
  port: configService.get<number>('POSTGRES_PORT', 5432),
  username: configService.get<string>('POSTGRES_USERNAME', 'postgres'),
  password: configService.get<string>('POSTGRES_PASSWORD', ''),
  database: configService.get<string>('POSTGRES_DB', 'postgres'),
  schema: 'public',
  logging: true,
  entities: [],
  migrations: [
    join(process.cwd(), 'src', 'database', 'migrations', '**', '*migration.ts'),
  ],
  migrationsRun: true,
  migrationsTableName: 'migrations',
};

export const appDataSource = new DataSource(dataSourceOptions);
