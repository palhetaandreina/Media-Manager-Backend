import { Category } from '@entities/category.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  public toEntity(): Category {
    const category = new Category();

    category.id = this.id;
    category.name = this.name;

    return category;
  }
}
