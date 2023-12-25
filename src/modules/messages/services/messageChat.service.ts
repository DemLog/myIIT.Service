import { HttpException, HttpStatus, Inject, Injectable, UploadedFile, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageChat } from "../../../database/entities/messages/message-chat.entity";
import { Equal, Repository } from "typeorm";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseChatDto } from "../dto/chat/response-chat.dto";
import { EditChatDto } from "../dto/chat/edit-chat.dto";
import { ProfileService } from "../../../modules/profile/profile.service";
import { AddUserChatDto } from "../dto/chat/add-user-chat.dto";
import { RemoveUserChatDto } from "../dto/chat/remove-user-chat.dto";
import { FileUploaderService } from "../../../modules/file-uploader/file-uploader.service";
import { CreateChatDto } from "../dto/chat/create-chat.dto";
import { v4 as uuidv4 } from 'uuid';
import { ResponseConversationDto } from "../dto/conversation/response-conversation.dto";
import { ResponseMessageDto } from "../dto/message/response-message.dto";
import { MessageService } from "./message.service";
import { Message } from "src/database/entities/messages/message.entity";

@Injectable()
export class MessageChatService {
    constructor(
        @InjectRepository(MessageChat)
        private readonly messageChatRepository: Repository<MessageChat>,
        private readonly profileService: ProfileService,
        private readonly fileUploaderService: FileUploaderService,
        @Inject(forwardRef(() => MessageService))
        private readonly messageService: MessageService
    ) {}

    async findAll(profile: Profile): Promise<ResponseChatDto[]> {
        const data = await this.messageChatRepository.find({
            where: [
                {members: {id: profile.id}}
            ],
            relations: { lastMessage: true },
        });

        let response: ResponseChatDto[] = [];
        for (let i = 0; i < data.length; i++) {
            const lastMessage: ResponseMessageDto = data[0].lastMessage ? await this.messageService.findOne(data[i].lastMessage.id) : null;
            const conversation: ResponseChatDto = {
                id: data[0].id,
                type: data[0].type,
                title: data[0].title,
                adminId: data[0].adminId,
                members: data[0].members,
                avatar: data[0].avatar,
                lastMessage
            }
            response.push(conversation);
        }
        return response;
    }

    async findOne(id: number, profile: Profile): Promise<ResponseChatDto> {
        const conversation = await this.getMessageChat(id);
        const lastMessage: ResponseMessageDto = conversation .lastMessage ? await this.messageService.findOne(conversation.lastMessage.id) : null;
        return {
            id: conversation.id,
            type: conversation.type,
            title: conversation.title,
            adminId: conversation.adminId,
            members: conversation.members,
            avatar: conversation.avatar,
            lastMessage
        };
    }

    async getMessageChat(id: number): Promise<MessageChat> {
        return this.messageChatRepository.findOne({where: {id}, relations: {lastMessage: true}})
    }

    async remove(id: number, profile: Profile): Promise<void> {
        const chat = await this.getMessageChat(id);
        if (chat.adminId.id === profile.id) {
            await this.messageChatRepository.remove(chat);
        }
    }

    async edit(id: number, editChatDto: EditChatDto, profile: Profile): Promise<ResponseChatDto> {
        const chat = await this.getMessageChat(id);
        const newAdmin = editChatDto.adminId ? await this.profileService.getProfile(editChatDto.adminId) : profile;
        if (chat.adminId.id !== profile.id) {
            throw new HttpException("Вы не администратор беседы!", HttpStatus.FORBIDDEN);
        }
        await this.messageChatRepository.merge(chat, {title: editChatDto.title, adminId: newAdmin});
        const response = await this.messageChatRepository.save(chat);
        const lastMessage: ResponseMessageDto = response.lastMessage ? await this.messageService.findOne(response.lastMessage.id) : null;
        return {
            id: response.id,
            type: response.type,
            title: response.title,
            adminId: response.adminId,
            members: response.members,
            avatar: response.avatar,
            lastMessage
        };
    }

    async addMember(addUserChatDto: AddUserChatDto, profile: Profile): Promise<void> {
        const chat = await this.getMessageChat(addUserChatDto.id);
        if (chat.adminId.id !== profile.id) {
            throw new HttpException("Вы не администратор беседы!", HttpStatus.FORBIDDEN);
        }
        const member = await this.profileService.getProfile(addUserChatDto.userId);
        chat.members.push(member);
        await this.messageChatRepository.save(chat);
    }

    async removeMember(removeUserChatDto: RemoveUserChatDto, profile: Profile): Promise<void> {
        const chat = await this.getMessageChat(removeUserChatDto.id);
        if (chat.adminId.id !== profile.id) {
            throw new HttpException("Вы не администратор беседы!", HttpStatus.FORBIDDEN);
        }
        const member = await this.profileService.getProfile(removeUserChatDto.userId);
        chat.members = chat.members.filter(p => p !== member);
        await this.messageChatRepository.save(chat);
    }

    async setPhotoChat(id: number, @UploadedFile() file: Express.Multer.File, profile: Profile): Promise<void> {
        const chat = await this.getMessageChat(id);
        if (chat.adminId.id !== profile.id) {
            throw new HttpException("Вы не администратор беседы!", HttpStatus.FORBIDDEN);
        }
        const photo = await this.fileUploaderService.uploadMedia(file, {}, profile);
        this.messageChatRepository.merge(chat, {avatar: photo.url})
        await this.messageChatRepository.save(chat);
    }

    async deletePhotoChat(id: number, profile: Profile): Promise<void> {
        const chat = await this.getMessageChat(id);
        if (chat.adminId.id !== profile.id) {
            throw new HttpException("Вы не администратор беседы!", HttpStatus.FORBIDDEN);
        }
        this.messageChatRepository.merge(chat, {avatar: null})
        await this.messageChatRepository.save(chat);
    }

    async create(createChatDto: CreateChatDto, profile: Profile): Promise<ResponseChatDto> {
        const secret = uuidv4();
        const chat = await this.messageChatRepository.create({title: createChatDto.title, adminId: profile, members: [profile], secret});
        const response = await this.messageChatRepository.save(chat);
        const lastMessage: ResponseMessageDto = response.lastMessage ? await this.messageService.findOne(response.lastMessage.id) : null;
        return {
            id: response.id,
            type: response.type,
            title: response.title,
            adminId: response.adminId,
            members: response.members,
            avatar: response.avatar,
            lastMessage
        };
    }

    async addLastMessage(message: Message, id: number): Promise<void> {
        const chat = await this.getMessageChat(id);
        chat.lastMessage = message;
        await this.messageChatRepository.save(chat);
    }
}