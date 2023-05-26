import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsAggregator } from "../../database/entities/news/news-aggregator.entity";
import { Repository } from "typeorm";
import { ResponseNewsAggregatorDto } from "./dto/response-news-aggregator.dto";
import { CreateNewsAggregatorDto } from "./dto/create-news-aggregator.dto";
import { FileUploaderService } from "../file-uploader/file-uploader.service";
import { UpdateNewsAggregatorDto } from "./dto/update-news-aggregator.dto";
import { CreateNewsDto } from "./dto/create-news.dto";
import { ResponseNewsDto } from "./dto/response-news.dto";
import { News } from "../../database/entities/news/news.entity";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsAggregator)
    private readonly newsAggregatorRepository: Repository<NewsAggregator>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly fileUploaderService: FileUploaderService
  ) {
  }

  async createNewsAggregator(createNewsAggregatorDto: CreateNewsAggregatorDto): Promise<ResponseNewsAggregatorDto> {
    const image = await this.fileUploaderService.uploadMedia(createNewsAggregatorDto.image, { caption: createNewsAggregatorDto.name });
    const newsAggregator = this.newsAggregatorRepository.create({
      ...createNewsAggregatorDto,
      image
    });
    return await this.newsAggregatorRepository.save(newsAggregator);
  }

  async getNewsAggregator(id: number): Promise<NewsAggregator> {
    const newsAggregator = await this.newsAggregatorRepository.findOne({ where: { id } });
    if (!newsAggregator) {
      throw new HttpException("Новостной агрегатор не найден", HttpStatus.NOT_FOUND);
    }
    return newsAggregator;
  }

  async findAllNewsAggregator(): Promise<ResponseNewsAggregatorDto[]> {
    return this.newsAggregatorRepository.find();
  }

  async findOneNewsAggregator(id: number): Promise<ResponseNewsAggregatorDto> {
    return this.getNewsAggregator(id);
  }

  async updateNewsAggregator(id: number, updateNewsAggregatorDto: UpdateNewsAggregatorDto): Promise<ResponseNewsAggregatorDto> {
    const newsAggregator = await this.getNewsAggregator(id);
    let image;

    if (updateNewsAggregatorDto.image) {
      image = await this.fileUploaderService.uploadMedia(updateNewsAggregatorDto.image, { caption: newsAggregator.name });
    }

    this.newsAggregatorRepository.merge(newsAggregator, updateNewsAggregatorDto, { image });
    return this.newsAggregatorRepository.save(newsAggregator);
  }

  async removeNewsAggregator(id: number): Promise<void> {
    const newsAggregator = await this.getNewsAggregator(id);
    await this.newsAggregatorRepository.remove(newsAggregator);
  }

  async createNews(createNewsDto: CreateNewsDto): Promise<ResponseNewsDto> {
    const mediaPromises = createNewsDto.media.map(async file => {
      return await this.fileUploaderService.uploadMedia(file, { caption: file.originalname });
    });
    const mediaList = await Promise.all(mediaPromises);
    const newsAggregator = await this.getNewsAggregator(createNewsDto.newsAggregator);

    const news = this.newsRepository.create({
      ...createNewsDto,
      newsAggregator,
      media: mediaList
    });
    return this.newsRepository.save(news);
  }

  async getNews(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({where: {id}, relations: {newsAggregator: true, media: true}})
    if (!news) {
      throw new HttpException("Новость не была найдена", HttpStatus.NOT_FOUND);
    }
    return news;
  }

  async findOneNews(id: number): Promise<ResponseNewsDto> {
    return this.getNews(id);
  }

  async findAllNews(): Promise<ResponseNewsDto[]> {
    return this.newsRepository.find({relations: {newsAggregator: true, media: true}, order: { date: 'DESC' }});
  }

  async updateNews(id: number, updateNewsDto: UpdateNewsDto): Promise<ResponseNewsDto> {
    const news = await this.getNews(id);

    const mediaPromises = updateNewsDto.media.map(async file => {
      return await this.fileUploaderService.uploadMedia(file, { caption: file.originalname });
    });
    const mediaList = await Promise.all(mediaPromises);

    this.newsRepository.merge(news, updateNewsDto, {media: mediaList});
    return this.newsRepository.save(news);
  }

  async removeNews(id: number): Promise<void> {
    const news = await this.getNews(id);
    await this.newsRepository.remove(news);
  }
}
