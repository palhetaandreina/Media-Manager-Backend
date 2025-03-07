import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private async createCategories() {
    const categoriesLabels = ['Romance', 'Drama', 'Ação', 'Terror'];
    const categories: Category[] = [];

    // Criando categorias a partir de categoriesLabels
    for await (const label of categoriesLabels) {
      const category = await this.categoryRepository.save({
        name: label,
      });

      this.logger.debug(`Criando categoria: ${JSON.stringify(category)}`);

      // Salvando em categories
      categories.push(category);
    }

    return categories;
  }

  private async createMedias(categories: Category[], users: User[]) {
    for (const user of users) {
      for (let i = 0; i < this.getRandom(10, 30); i++) {
        const date = new Date();
        date.setDate(date.getDate() - this.getRandom(0, 30));

        const category = categories.at(
          this.getRandom(0, categories.length - 1),
        );

        if (!category) {
          continue;
        }

        const media = await this.mediaRepository.save({
          category: category,
          duration: this.getRandom(60, 120),
          title: 'Movie #' + (i + 1),
          type: Boolean(this.getRandom(0, 1)),
          user: user,
          date: date,
        });

        this.logger.debug(`Criando media: ${JSON.stringify(media)}`);
      }
    }
  }

  private async createUsers() {
    const users: User[] = [];

    for (let i = 0; i < 5; i++) {
      const user = await this.userRepository.save({
        email: `user-${i}@gmail.com`,
        name: `User ${i}`,
        password: 'senha',
      });

      this.logger.debug(`Criando usuario: ${JSON.stringify(user)}`);

      users.push(user);
    }

    return users;
  }

  async run() {
    const categories = await this.createCategories();
    const users = await this.createUsers();
    await this.createMedias(categories, users);
  }
}
