import { Module } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "../../database/entities/news/news.entity";
import { NewsAggregator } from "../../database/entities/news/news-aggregator.entity";
import { FileUploaderModule } from "../file-uploader/file-uploader.module";

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsAggregator]),
    FileUploaderModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {
}
