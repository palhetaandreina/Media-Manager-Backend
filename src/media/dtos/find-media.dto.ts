import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export enum FindMediaByOptions {
  day = 'day',
  month = 'month',
  year = 'year',
}

export class FindMediaDTO {
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsDate()
  @Type(() => Date)
  to: Date = new Date();

  @IsOptional()
  @IsEnum(FindMediaByOptions)
  by: FindMediaByOptions = FindMediaByOptions.day;
}
