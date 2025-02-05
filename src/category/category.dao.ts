import { Category } from '@entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryDAO {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  find() {
    return this.repository.find();
  }

  create(category: Category) {
    return this.repository.save(category);
  }

  update(category: Category) {
    return this.repository.update(
      {
        id: category.id,
      },
      category,
    );
  }

  delete(id) {
    return this.repository.delete({
      id: id,
    });
  }
}
