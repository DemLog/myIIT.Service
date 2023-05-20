import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../database/entities/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    RoleModule,
  ],
  controllers: [
    ProfileController
  ],
  providers: [
    ProfileService
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {}