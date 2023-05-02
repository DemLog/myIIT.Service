import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppDataSource implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get<string>("POSTGRES_HOST", "localhost"),
      port: this.configService.get<number>("POSTGRES_PORT", 5432),
      username: this.configService.get<string>("POSTGRES_USERNAME", "postgres"),
      password: this.configService.get<string>("POSTGRES_PASSWORD", ""),
      database: this.configService.get<string>("POSTGRES_DB", "postgres"),
      schema: "public",
      logging: true,
      entities: [join(process.cwd(), "dist", "database", "entities", "**", "*.entity.js")],
      migrations: [
        join(process.cwd(), "dist", "database", "migrations", "*migration.js")
      ],
      migrationsRun: true,
      migrationsTableName: "migrations"
    };
  }
}