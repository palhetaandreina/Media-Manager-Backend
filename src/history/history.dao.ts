import { History } from '@entities/history.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryDAO {
  constructor(
    @InjectRepository(History)
    private repository: Repository<History>,
  ) {}

  find() {
    return this.repository.find();
  }

  create(history: History) {
    return this.repository.save(history);
  }
}
