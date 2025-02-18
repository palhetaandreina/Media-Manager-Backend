import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export enum FindHistoryByOptions {
  day = 'day',
  month = 'month',
  year = 'year',
}

export class FindHistoryDTO {
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsDate()
  @Type(() => Date)
  to: Date = new Date();

  @IsOptional()
  @IsEnum(FindHistoryByOptions)
  by: FindHistoryByOptions = FindHistoryByOptions.day;
}
