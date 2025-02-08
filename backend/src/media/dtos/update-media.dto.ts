import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

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

  // Transforma o dto em entidades
  public toEntity(): Media {
    const media = new Media();

    // Precisa instanciar uma nova category, pois e esperado pela entidade media
    media.category = new Category();
    media.category.id = this.category;

    media.id = this.id;
    media.duration = this.duration;
    media.title = this.title;
    media.type = this.type;

    return media;
  }
}
