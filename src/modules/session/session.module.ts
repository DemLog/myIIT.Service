import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../database/entities/session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    JwtModule.register({
      secret: "fdgfdgnhgftgfhbgf",
      signOptions: { expiresIn: '1y' },
    }),
    ProfileModule
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
