import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { ResponseNotificationDto } from './dto/response-notification.dto';
import { Profile } from "../../database/entities/users/profile.entity";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { RecipientType } from 'src/common/enums/notification/recipientType.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@WebSocketGateway({ cors: true })
@UseGuards(JwtAuthGuard)
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private connectedClients: Map<string, Profile> = new Map();

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // Ваша логика обработки подключения
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Ваша логика обработки отключения
    console.log(`Client disconnected: ${client.id}`);

    // Если клиент подписан на уведомления, удаляем его
    if (this.connectedClients.has(client.id)) {
      const userProfile = this.connectedClients.get(client.id);
      this.connectedClients.delete(client.id);
    }
  }

  @SubscribeMessage('subscribeToNotifications')
  async handleSubscribeToNotifications(@ConnectedSocket() client: Socket, @CurrentUser() currentUser: Profile): Promise<void> {
    // Добавляем клиента в комнату "notifications" для отправки уведомлений только этому клиенту
    client.join(`notifications-${currentUser.id}`);
    console.log(`Client ${client.id} subscribed to notifications for user ${currentUser.id}`);

    // Сохраняем маппинг клиента к профилю пользователя
    this.connectedClients.set(client.id, currentUser);
  }

  @SubscribeMessage('unsubscribeFromNotifications')
  handleUnsubscribeFromNotifications(@ConnectedSocket() client: Socket): void {
    // Если клиент подписан на уведомления, удаляем его
    if (this.connectedClients.has(client.id)) {
      const userProfile = this.connectedClients.get(client.id);
      client.leave(`notifications-${userProfile.id}`);
      this.connectedClients.delete(client.id);
    }
  }

  async emitNotifications(userProfile: number, notification: ResponseNotificationDto): Promise<void> {
    if (notification.recipientType === RecipientType.All) {
      this.connectedClients.forEach(user => this.server.to(`notifications-${user.id}`).emit('notifications', notification))
    } else {
      console.log(userProfile);
      this.server.to(`notifications-${userProfile}`).emit('notifications', notification);
    }
  }
}
