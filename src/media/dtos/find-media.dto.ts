import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export enum FindMediaByOptions {
  day = 'day',
  month = 'month',
  year = 'year',
}

export class FindMediaDTO {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to: Date = new Date();

  @IsOptional()
  @IsEnum(FindMediaByOptions)
  by: FindMediaByOptions = FindMediaByOptions.day;
}
