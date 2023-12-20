import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notification/notification.entity';
import { In, Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ResponseNotificationDto } from './dto/response-notification.dto';
import { ProfileService } from '../profile/profile.service';
import { RecipientType } from 'src/common/enums/notification/recipientType.enum';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly profileService: ProfileService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  async findAll(): Promise<ResponseNotificationDto[]> {
    return this.notificationRepository.find();
  }

  async findOne(id: number): Promise<ResponseNotificationDto> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new HttpException('Уведомление не найдено', HttpStatus.NOT_FOUND);
    }
    return notification;
  }

  async findAllForUser(id: number): Promise<ResponseNotificationDto[]> {
    const profile = await this.profileService.getProfile(id);
    const roleIds = profile.roles?.map(role => role.id) || [];

    const notifications = await this.notificationRepository.find({
      where: [
        { recipientType: RecipientType.User, recipientId: id },
        { recipientType: RecipientType.Group, recipientId: In(roleIds) },
        { recipientType: RecipientType.All },
      ],
      order: { time: 'DESC' },
    });

    return notifications;
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      time: new Date(), // Добавление текущего времени
    });

    if (notification.recipientType === RecipientType.User) {
      console.log(notification)
        const profile = await this.profileService.getProfile(notification.recipientId);
        await this.notificationGateway.emitNotifications(profile.id, notification);
    } else if (notification.recipientType === RecipientType.Group) {
        const profiles = await this.profileService.getProfilesInGroup(notification.recipientId);
        profiles.forEach(async profile => await this.notificationGateway.emitNotifications(profile.id, notification));
    } else {
        await this.notificationGateway.emitNotifications(0, notification)
    }
    return this.notificationRepository.save(notification);
  }
}
