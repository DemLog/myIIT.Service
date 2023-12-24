import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../database/entities/profile/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { RoleModule } from "../role/role.module";
import { ProfileInfo } from '../../database/entities/profile/profile-info.entity';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, ProfileInfo]),
    RoleModule,
    FileUploaderModule
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