import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../database/entities/session.entity';
import { ProfileModule } from '../profile/profile.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    ProfileModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
