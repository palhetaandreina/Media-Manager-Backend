import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

// Dto vai validar os valores do request
export class UpdateMediaDTO {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => Number)
  @IsBoolean()
  @Transform((params) => params.value === 1)
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

  // Transforma o dto em entidades
  public toEntity(userId: number): Media {
    const media = new Media();

    // Precisa instanciar uma nova category, pois e esperado pela entidade media
    media.category = new Category();
    media.category.id = this.category;

    media.duration = this.duration;
    media.title = this.title;
    media.type = this.type;
    media.date = this.date;

    media.user = new User();
    media.user.id = userId;

    media.id = this.id;

    return media;
  }
}
