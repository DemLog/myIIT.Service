import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: AppDataSource
    }),
  ],
})
export class DatabaseModule {}