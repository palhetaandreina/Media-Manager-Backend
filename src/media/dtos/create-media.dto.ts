import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
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

  public toEntity(): Media {
    const media = new Media();

    media.category = new Category();
    media.category.id = this.category;

    media.duration = this.duration;
    media.title = this.title;
    media.type = this.type;

    return media;
  }
}
