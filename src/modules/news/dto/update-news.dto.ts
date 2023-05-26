import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateNewsDto } from "./create-news.dto";

export class UpdateNewsDto extends PartialType(OmitType(CreateNewsDto, ['newsAggregator'] as const)) {}