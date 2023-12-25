import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PeerType } from "src/common/enums/messages/peerType.enum";
import { Message } from "src/database/entities/messages/message.entity";
import { Profile } from "src/database/entities/profile/profile.entity";
import { Equal, Repository } from "typeorm";
import { MessageConversationService } from "./messageConversation.service";
import { MessageChatService } from "./messageChat.service";
import { CreateMessageDto } from "../dto/message/create-message.dto";
import { ResponseMessageDto } from "../dto/message/response-message.dto";
import { Attachment } from "src/database/entities/file/attachment.entity";
import { FileUploaderService } from "src/modules/file-uploader/file-uploader.service";
import { ResponseAttachmentDto } from "src/modules/file-uploader/dto/response-attachment.dto";
import { chatSecretKey, conversationSecretKey, feedbackSecretKey } from "src/config/secret.config";
import { MessageFeedbackService } from "./messageFeedback.service";
import { decryptData, encryptData } from "src/utils/crypto/crypto.service";
import { EditMessageDto } from "../dto/message/edit-message.dto";
import { QueryHistoryMessageDto } from "../dto/query-history-message.dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        private readonly messageConversationService: MessageConversationService,
        private readonly messageChatService: MessageChatService,
        private readonly messageFeedbackService: MessageFeedbackService,
        private readonly fileUploaderService: FileUploaderService
    ) { }

    async getMessage(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({ where: { id }, relations: { fromId: true, attachments: true, replyMessage: true } });
        if (!message) {
            throw new HttpException("Сообщение не найдено", HttpStatus.NOT_FOUND);
        }
        return message;
    }

    async findOne(id: number): Promise<ResponseMessageDto> {
        const message = await this.getMessage(id);
        const replyMessage = message.replyMessage ? await this.findOne(message.replyMessage.id) : null;
        const attachmentsData: ResponseAttachmentDto[] = [];
        if (message.attachments.length > 0) {
            for (let i = 0; i < message.attachments.length; i++) {
                attachmentsData.push({ type: message.attachments[i].type, url: message.attachments[i].file.url })
            }
        }

        // let secret: string;
        // let secretModule: string;
        // switch (message.peerType) {
        //     case PeerType.Chat:
        //         secret = (await this.messageChatService.getMessageChat(message.peerId)).secret;
        //         secretModule = chatSecretKey;
        //     case PeerType.Feedback:
        //         secret = (await this.messageFeedbackService.getMessageFeedback(message.peerId)).secret;
        //         secretModule = feedbackSecretKey;
        //     default:
        //         secret = (await this.messageConversationService.getMessageConversation(message.peerId)).secret;
        //         secretModule = conversationSecretKey;
        // }
        // const messageText = decryptData(message.text, secretModule + secret, secret.length);
        // console.log(messageText);
        // console.log(decryptData(message.text, secretModule + secret, secretModule.length));
        return {
            id: message.id,
            date: message.date,
            updateDate: message.updateDate,
            fromId: message.fromId,
            text: message.text,
            attachments: attachmentsData,
            replyMessage,
            isRead: message.isRead,
            deleted: message.deleted,
            edited: message.edited,
            peerType: message.peerType,
            peerId: message.peerId
        };
    }

    async create(files: Express.Multer.File[], createMessageDto: CreateMessageDto, profile: Profile): Promise<ResponseMessageDto> {
        const attachments: Attachment[] = [];
        const attachmentsData: ResponseAttachmentDto[] = [];
        if (files?.length > 0 && createMessageDto.attachments?.length > 0) {
            for (let i = 0; i < createMessageDto.attachments.length; i++) {
                const attachment = await this.fileUploaderService.uploadAttachment(files[i], createMessageDto.attachments[i], profile);
                attachments.push(attachment);
                attachmentsData.push({ type: attachment.type, url: attachment.file.url })
            }
        }

        // let secret: string;
        // let secretModule: string;
        const replyMessage: Message = createMessageDto.replyMessage ? await this.getMessage(createMessageDto.replyMessage) : null;
        const replyMessageData: ResponseMessageDto = createMessageDto.replyMessage ? await this.findOne(replyMessage.id) : null;
        // switch (createMessageDto.peerType) {
        //     case PeerType.Chat:
        //         secret = (await this.messageChatService.getMessageChat(createMessageDto.peerId)).secret;
        //         secretModule = chatSecretKey;
        //     case PeerType.Feedback:
        //         secret = (await this.messageFeedbackService.getMessageFeedback(createMessageDto.peerId)).secret;
        //         secretModule = feedbackSecretKey;
        //     default:
        //         secret = (await this.messageConversationService.getMessageConversation(createMessageDto.peerId)).secret;
        //         secretModule = conversationSecretKey;
        // }
        // const messageText = encryptData(createMessageDto.text, secretModule + secret);
        const message = await this.messageRepository.create({
            fromId: profile,
            text: createMessageDto.text,
            attachments,
            replyMessage,
            peerType: createMessageDto.peerType,
            peerId: createMessageDto.peerId
        });

        await this.messageRepository.save(message);

        switch (createMessageDto.peerType) {
            case PeerType.Chat:
                await this.messageChatService.addLastMessage(message, createMessageDto.peerId);
                break;
            case PeerType.Feedback:
                await this.messageFeedbackService.addLastMessage(message, createMessageDto.peerId);
                break;
            default:
                await this.messageConversationService.addLastMessage(message, createMessageDto.peerId, profile);
                break;
        }

        return {
            id: message.id,
            date: message.date,
            updateDate: message.updateDate,
            fromId: message.fromId,
            text: createMessageDto.text,
            attachments: attachmentsData,
            replyMessage: replyMessageData,
            isRead: message.isRead,
            deleted: message.deleted,
            edited: message.edited,
            peerType: message.peerType,
            peerId: message.peerId
        };
    }

    async update(id: number, editMessageDto: EditMessageDto, profile: Profile): Promise<ResponseMessageDto> {
        const message = await this.getMessage(id);
        if (message.fromId.id !== profile.id) {
            throw new HttpException("Вы не можете редактировать чужое сообщение!", HttpStatus.FORBIDDEN)
        }
        // let secret: string;
        // let secretModule: string;
        // switch (message.peerType) {
        //     case PeerType.Chat:
        //         secret = (await this.messageChatService.getMessageChat(message.peerId)).secret;
        //         secretModule = chatSecretKey;
        //     case PeerType.Feedback:
        //         secret = (await this.messageFeedbackService.getMessageFeedback(message.peerId)).secret;
        //         secretModule = feedbackSecretKey;
        //     default:
        //         secret = (await this.messageConversationService.getMessageConversation(message.peerId)).secret;
        //         secretModule = conversationSecretKey;
        // }
        // const messageText = encryptData(editMessageDto.text, secretModule + secret);
        await this.messageRepository.merge(message, { text: editMessageDto.text });
        await this.messageRepository.save(message);
        return this.findOne(message.id);

    }

    async remove(id: number, profile: Profile): Promise<void> {
        const message = await this.getMessage(id);
        if (message.fromId.id !== profile.id) {
            throw new HttpException("Вы не можете удалить чужое сообщение!", HttpStatus.FORBIDDEN)
        }
        await this.messageRepository.remove(message);
    }

    async getHistory(queryHistoryMessageDto: QueryHistoryMessageDto, profile: Profile): Promise<ResponseMessageDto[]> {
        const messageIds = await this.messageRepository.find({ where: { peerType: queryHistoryMessageDto.peerType, peerId: queryHistoryMessageDto.peerId } });
        const responseMessages: ResponseMessageDto[] = [];
        for (let i = 0; i < messageIds.length; i++) {
            responseMessages.push(await this.findOne(messageIds[i].id));
        }
        return responseMessages;
    }

}