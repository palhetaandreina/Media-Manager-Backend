import { History } from '@entities/history.entity';
import { Injectable } from '@nestjs/common';
import { HistoryDAO } from './history.dao';

@Injectable()
export class HistoryService {
  constructor(private dao: HistoryDAO) {}

  getHistory() {
    return this.dao.find();
  }

  createHistory(history: History) {
    return this.dao.create(history);
  }
}
