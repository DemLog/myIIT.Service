import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageConversation } from "../../../database/entities/messages/message-conversation.entity";
import { Equal, Repository } from "typeorm";
import { ResponseConversationDto } from "../dto/conversation/response-conversation.dto";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { v4 as uuidv4 } from 'uuid';
import { ProfileService } from "src/modules/profile/profile.service";
import { MessageService } from "./message.service";
import { ResponseMessageDto } from "../dto/message/response-message.dto";
import { Message } from "src/database/entities/messages/message.entity";

@Injectable()
export class MessageConversationService {
    constructor(
        @InjectRepository(MessageConversation)
        private readonly messageConversationRepository: Repository<MessageConversation>,
        private readonly profileService: ProfileService,
        @Inject(forwardRef(() => MessageService))
        private readonly messageService: MessageService
    ) { }

    async findAll(profile: Profile): Promise<ResponseConversationDto[]> {
        const data = await this.messageConversationRepository.find({
            where: [
                { fromId: {id: profile.id} },
                { peerId: {id: profile.id}  },
            ],
            relations: { lastMessage: true },
        });

        let response: ResponseConversationDto[] = [];
        for (let i = 0; i < data.length; i++) {
            const lastMessage: ResponseMessageDto = data[0].lastMessage ? await this.messageService.findOne(data[i].lastMessage.id) : null;
            const conversation: ResponseConversationDto = {
                id: data[0].id,
                fromId: data[0].fromId,
                peerId: data[0].peerId,
                lastMessage
            }
            response.push(conversation);
        }
        return response;
    }

    async findOne(id: number, profile: Profile): Promise<ResponseConversationDto> {
        const conversation = await this.getMessageConversation(id);
        const lastMessage: ResponseMessageDto = conversation.lastMessage ? await this.messageService.findOne(conversation.lastMessage.id) : null;
        return {
            id: conversation.id,
            fromId: conversation.fromId,
            peerId: conversation.peerId,
            lastMessage
        };
    }

    async getMessageConversation(id: number): Promise<MessageConversation> {
        return this.messageConversationRepository.findOne({ where: { id }, relations: { lastMessage: true } })
    }

    async remove(id: number, profile: Profile): Promise<void> {
        const conversation = await this.getMessageConversation(id);
        await this.messageConversationRepository.remove(conversation);
    }

    async create(fromId: Profile, peerId: Profile): Promise<ResponseConversationDto> {
        const secret = uuidv4();
        const conversation = await this.messageConversationRepository.create({ fromId, peerId, secret });
        const data = await this.messageConversationRepository.save(conversation);
        return {
            id: data.id,
            fromId: data.fromId,
            peerId: data.peerId,
            lastMessage: null
        };
    }

    async getUserChat(peerId: number, profile: Profile): Promise<ResponseConversationDto> {
        const peerProfile = await this.profileService.getProfile(peerId);
        const isConversation = await this.messageConversationRepository
            .createQueryBuilder('conversation')
            .where('conversation.fromId = :profileId AND conversation.peerId = :peerId', {
                profileId: profile.id,
                peerId: peerProfile.id,
            })
            .orWhere('conversation.fromId = :peerId AND conversation.peerId = :profileId', {
                profileId: profile.id,
                peerId: peerProfile.id,
            })
            .leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
            .getOne();

        if (isConversation) {
            return {
                id: isConversation.id,
                fromId: isConversation.fromId,
                peerId: isConversation.peerId,
                lastMessage: null
            };
        }

        return this.create(profile, peerProfile);
    }

    async addLastMessage(message: Message, id: number, profile: Profile): Promise<void> {
        const chatId = await this.getUserChat(id, profile);
        const chat = await this.getMessageConversation(chatId.id);
        await this.messageConversationRepository.merge(chat, {lastMessage: message});
        await this.messageConversationRepository.save(chat);
    }
}