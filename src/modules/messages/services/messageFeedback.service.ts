import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageFeedback } from "../../../database/entities/messages/message-feedback.entity";
import { Equal, Repository } from "typeorm";
import { ProfileService } from "../../../modules/profile/profile.service";
import { Profile } from "../../../database/entities/profile/profile.entity";
import { ResponseFeedbackDto } from "../dto/feedback/response-feedback.dto";
import { v4 as uuidv4 } from 'uuid';
import { CreateFeedbackDto } from "../dto/feedback/create-feedback.dto";
import { ResponseMessageDto } from "../dto/message/response-message.dto";
import { MessageService } from "./message.service";
import { Message } from "src/database/entities/messages/message.entity";

@Injectable()
export class MessageFeedbackService {
    constructor(
        @InjectRepository(MessageFeedback)
        private readonly messageFeedbackRepository: Repository<MessageFeedback>,
        @Inject(forwardRef(() => MessageService))
        private readonly messageService: MessageService
    ) {}

    async findAll(profile: Profile): Promise<ResponseFeedbackDto[]> {
        const data = await this.messageFeedbackRepository.find({
            where: [
                {fromId: {id: profile.id} }
            ],
            relations: { lastMessage: true },
        });
        let response: ResponseFeedbackDto[] = [];
        for (let i = 0; i < data.length; i++) {
            const lastMessage: ResponseMessageDto = data[0].lastMessage ? await this.messageService.findOne(data[i].lastMessage.id) : null;
            const conversation: ResponseFeedbackDto = {
                id: data[0].id,
                fromId: data[0].fromId,
                date: data[0].date,
                isActive: data[0].isActive,
                lastMessage
            }
            response.push(conversation);
        }
        return response;
    }

    async findOne(id: number, profile: Profile): Promise<ResponseFeedbackDto> {
        const feedback = await this.getMessageFeedback(id);
        const lastMessage: ResponseMessageDto = feedback.lastMessage ? await this.messageService.findOne(feedback.lastMessage.id) : null;
        return {
            id: feedback.id,
            fromId: feedback.fromId,
            date: feedback.date,
            isActive: feedback.isActive,
            lastMessage
        };
    }

    async getMessageFeedback(id: number): Promise<MessageFeedback> {
        return this.messageFeedbackRepository.findOne({where: {id}, relations: {lastMessage: true}})
    }

    async create(createFeedbackDto: CreateFeedbackDto, profile: Profile): Promise<ResponseFeedbackDto> {
        const secret = uuidv4();
        const feedback = await this.messageFeedbackRepository.create({fromId: profile, secret});
        const response = await this.messageFeedbackRepository.save(feedback);
        return {
            id: response.id,
            fromId: response.fromId,
            date: response.date,
            isActive: response.isActive,
            lastMessage: null
        };
    }

    async addLastMessage(message: Message, id: number): Promise<void> {
        const chat = await this.getMessageFeedback(id);
        chat.lastMessage = message;
        await this.messageFeedbackRepository.save(chat);
    }

}