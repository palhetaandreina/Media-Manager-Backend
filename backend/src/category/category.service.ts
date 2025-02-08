import { Category } from '@entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CategoryDAO } from './category.dao';

@Injectable()
export class CategoryService {
  constructor(private dao: CategoryDAO) {}

  // Fazendo as requisicoes no db pelo dao
  getCategory() {
    return this.dao.find();
  }

  createCategory(category: Category) {
    return this.dao.create(category);
  }

  updateCategory(category: Category) {
    return this.dao.update(category);
  }

  deleteCategory(id: number) {
    return this.dao.delete(id);
  }
}
