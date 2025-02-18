import { History } from '@entities/history.entity';
import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class HistoryDAO {
  constructor(
    @InjectRepository(History)
    private repository: Repository<History>,
  ) {}

  findByUser(userId: number, from: Date, to: Date) {
    const user = new User();
    user.id = userId;

    return this.repository.find({
      where: {
        user: user,
        date: Between(from, to),
      },
      relations: {
        media: {
          category: true,
        },
      },
    });
  }

  create(history: History) {
    return this.repository.save(history);
  }

  delete(id: number, userId: number) {
    const user = new User();
    user.id = userId;

    return this.repository.delete({
      id: id,
      user: user,
    });
  }
}
