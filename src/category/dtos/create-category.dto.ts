import { Category } from '@entities/category.entity';
import { IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  name: string;

  public toEntity(): Category {
    const category = new Category();
    category.name = this.name;

    return category;
  }
}
