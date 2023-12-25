import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageChannel } from '../../database/entities/messages/message-channel.entity';
import { MessageChat } from '../../database/entities/messages/message-chat.entity';
import { MessageConversation } from '../../database/entities/messages/message-conversation.entity';
import { MessageFeedback } from '../../database/entities/messages/message-feedback.entity';
import { Message } from '../../database/entities/messages/message.entity';
import { MessageController } from './controllers/message.controller';
import { MessageConversationController } from './controllers/messageConversation.controller';
import { MessageChatController } from './controllers/messageChat.controller';
import { MessageChannelController } from './controllers/messageChannel.controller';
import { MessageFeedbackController } from './controllers/messageFeedback.controller';
import { MessageService } from './services/message.service';
import { MessageConversationService } from './services/messageConversation.service';
import { MessageChatService } from './services/messageChat.service';
import { MessageChannelService } from './services/messageChannel.service';
import { MessageFeedbackService } from './services/messageFeedback.service';
import { ProfileModule } from '../profile/profile.module';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageConversation, MessageChat, MessageChannel, MessageFeedback]), ProfileModule, FileUploaderModule],
  controllers: [MessageController, MessageConversationController, MessageChatController, MessageChannelController, MessageFeedbackController],
  providers: [MessageService, MessageConversationService, MessageChatService, MessageChannelService, MessageFeedbackService],
  exports: [MessageService, MessageConversationService, MessageChatService, MessageChannelService, MessageFeedbackService]
})
export class MessagesModule {}
