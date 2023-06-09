import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const envFilePath = join(process.cwd(), 'src', 'config', 'env', '.env.development');
config({ path: envFilePath });

const options = (): DataSourceOptions => {
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const db = process.env.POSTGRES_DB;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  if (!host || !port || !db || !user || !password) {
    throw new Error('DATABASE not setted');
  }
  return {
    type: 'postgres',
    host,
    port: parseInt(port),
    database: db,
    username: user,
    password,
    schema: 'public',
    entities: [join(process.cwd(), "src", "database", "entities", "**", "*.entity.ts")],
    migrations: [join(process.cwd(), "src", "database", "migrations", "*migration.ts")],
    migrationsTableName: "migrations",
    migrationsRun: true,
    logging: true
  };
};

export const appDataSource = new DataSource(options());