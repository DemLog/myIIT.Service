import { PartialType } from "@nestjs/swagger";
import { CreateNewsAggregatorDto } from "./create-news-aggregator.dto";

export class UpdateNewsAggregatorDto extends PartialType(CreateNewsAggregatorDto) {}