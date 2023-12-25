import { Injectable } from "@nestjs/common";
import { MessageChannel } from "../../../database/entities/messages/message-channel.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MessageChannelService {
    constructor(
        @InjectRepository(MessageChannel)
        private readonly messageChannelRepository: Repository<MessageChannel>,
    ) {}
}