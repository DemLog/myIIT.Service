import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../database/entities/notification/notification.entity';
import { ProfileModule } from '../profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification]),
        ProfileModule,
        JwtModule,
        SessionModule
    ],
    controllers: [NotificationController],
    providers: [NotificationService, NotificationGateway],
    exports: [NotificationService]
})
export class NotificationModule { }
