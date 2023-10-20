import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsAggregatorDto } from "./dto/create-news-aggregator.dto";
import { ResponseNewsAggregatorDto } from "./dto/response-news-aggregator.dto";
import { UpdateNewsAggregatorDto } from "./dto/update-news-aggregator.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseNewsDto } from "./dto/response-news.dto";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@ApiBearerAuth()
@ApiTags('News')
@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Создать новостной агрегатор' })
  @ApiResponse({ status: 201, description: 'Новостной агрегатор успешно создан', type: ResponseNewsAggregatorDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post('news.createChannel')
  async createNewsAggregator(
    @Body() createNewsAggregatorDto: CreateNewsAggregatorDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ResponseNewsAggregatorDto> {
    createNewsAggregatorDto.image = image;
    return this.newsService.createNewsAggregator(createNewsAggregatorDto);
  }

  @ApiOperation({ summary: 'Получить все новостные агрегаторы' })
  @ApiResponse({ status: 200, description: 'Список всех новостных агрегаторов', type: ResponseNewsAggregatorDto, isArray: true })
  @Get('news.getChannelAll')
  async findAllNewsAggregators(): Promise<ResponseNewsAggregatorDto[]> {
    return this.newsService.findAllNewsAggregator();
  }

  @ApiOperation({ summary: 'Получить новостной агрегатор по ID' })
  @ApiResponse({ status: 200, description: 'Новостной агрегатор', type: ResponseNewsAggregatorDto })
  @Get('news.getChannel')
  async findOneNewsAggregator(@Query('id') id: number): Promise<ResponseNewsAggregatorDto> {
    return this.newsService.findOneNewsAggregator(id);
  }

  @ApiOperation({ summary: 'Обновить новостной агрегатор' })
  @ApiResponse({ status: 200, description: 'Новостной агрегатор успешно обновлен', type: ResponseNewsAggregatorDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Put('news.editChannel')
  async updateNewsAggregator(
    @Query('id') id: number,
    @Body() updateNewsAggregatorDto: UpdateNewsAggregatorDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ResponseNewsAggregatorDto> {
    updateNewsAggregatorDto.image = image;
    return this.newsService.updateNewsAggregator(id, updateNewsAggregatorDto);
  }

  @ApiOperation({ summary: 'Удалить новостной агрегатор' })
  @ApiResponse({ status: 204, description: 'Новостной агрегатор успешно удален' })
  @Delete('news.deleteChannel')
  async removeNewsAggregator(@Query('id') id: number): Promise<void> {
    return this.newsService.removeNewsAggregator(id);
  }

  @ApiOperation({ summary: 'Создать новость' })
  @ApiResponse({ status: 201, description: 'Новость успешно создана', type: ResponseNewsDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media'))
  @Post("news.addPost")
  async createNews(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ResponseNewsDto> {
    createNewsDto.media = files;
    return this.newsService.createNews(createNewsDto);
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiResponse({ status: 200, description: 'Список новостей', type: ResponseNewsDto })
  @Get("news.getPostAll")
  async findAllNews(): Promise<ResponseNewsDto[]> {
    return this.newsService.findAllNews();
  }

  @ApiOperation({ summary: 'Получить новость по ID' })
  @ApiResponse({ status: 200, description: 'Новость', type: ResponseNewsDto })
  @Get('news.getPost')
  async findOneNews(@Query('id') id: number): Promise<ResponseNewsDto> {
    return this.newsService.findOneNews(id);
  }

  @ApiOperation({ summary: 'Обновить новость' })
  @ApiResponse({ status: 200, description: 'Новость успешно обновлена', type: ResponseNewsDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media'))
  @Put('news.editPost')
  async updateNews(
    @Query('id') id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ResponseNewsDto> {
    updateNewsDto.media = files
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @ApiOperation({ summary: 'Удалить новость' })
  @ApiResponse({ status: 200, description: 'Новость успешно удалена' })
  @Delete('news.deletePost')
  async removeNews(@Query('id') id: number): Promise<void> {
    return this.newsService.removeNews(id);
  }
}
