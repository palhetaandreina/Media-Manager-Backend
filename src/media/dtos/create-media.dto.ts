import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMediaDTO {
  @Type(() => Number)
  @Transform((params) => params.value === 1)
  @IsBoolean()
  type: boolean;

  @Type(() => Number)
  @IsNumber()
  category: number;

  @IsString()
  title: string;

  @Type(() => Number)
  @IsNumber()
  duration: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId: number;

  public toEntity(userId: number): Media {
    const media = new Media();

    media.category = new Category();
    media.category.id = this.category;

    media.duration = this.duration;
    media.title = this.title;
    media.type = this.type;
    media.date = this.date;

    media.user = new User();
    media.user.id = userId;

    return media;
  }
}
