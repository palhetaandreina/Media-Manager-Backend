import { Injectable } from '@nestjs/common';

import { History } from '@entities/history.entity';
import { FindHistoryByOptions } from './dto/find-history.dto';
import { HistoryDAO } from './history.dao';

@Injectable()
export class HistoryService {
  constructor(private dao: HistoryDAO) {}

  private getKeyByFindOption(date: Date, by: FindHistoryByOptions): string {
    const splitted = date.toISOString().split('');

    // Escolhendo as opcoes
    switch (by) {
      case FindHistoryByOptions.day:
        return splitted.slice(0, 10).join('');
      case FindHistoryByOptions.month:
        return splitted.slice(0, 7).join('');
      case FindHistoryByOptions.year:
        return splitted.slice(0, 4).join('');
    }
  }

  // Busca histórico do usuario pela data
  async getHistory(userId: number, from: Date, to: Date) {
    return this.dao.findByUser(userId, from, to);
  }

  private group(history: History[], getKey: (item: History) => string) {
    return history.reduce((acc: Record<string, number>, item: History) => {
      const key = getKey(item);

      // Verifica se a chave não existe e cria uma nova chave
      if (acc[key] === undefined) {
        acc[key] = 0;
      }
      // se existir acrescenta a duração da midia
      acc[key] += item.media.duration;

      return acc;
    }, {});
  }

  // agrupa pelo by que vem do query params
  async getHistoryByDate(
    userId: number,
    from: Date,
    to: Date,
    by: FindHistoryByOptions,
  ) {
    const history = await this.dao.findByUser(userId, from, to);

    // retorna o historico acumulado pela opcao by
    return this.group(history, (item: History) =>
      this.getKeyByFindOption(item.date, by),
    );
  }

  // agrupa pelas categorias assistidas
  async getHistoryByCategories(userId: number, from: Date, to: Date) {
    const history = await this.dao.findByUser(userId, from, to);

    // retorna o historico acumulado pela opcao by
    return this.group(history, (item: History) => item.media.category.name);
  }

  // agrupa pelas categorias assistidas
  async getHistoryByMediaType(userId: number, from: Date, to: Date) {
    const history = await this.dao.findByUser(userId, from, to);

    // retorna o historico acumulado pela opcao by
    return this.group(history, (item: History) =>
      item.media.type ? 'Filme' : 'Série',
    );
  }

  createHistory(history: History) {
    return this.dao.create(history);
  }

  deleteHistory(id: number, userId: number) {
    return this.dao.delete(id, userId);
  }
}
