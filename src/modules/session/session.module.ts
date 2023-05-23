import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../database/entities/users/session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { ProfileModule } from "../profile/profile.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
    ProfileModule
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService, JwtModule]
})
export class SessionModule {}
