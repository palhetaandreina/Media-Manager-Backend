import { Media } from '@entities/media.entity';
import { Injectable } from '@nestjs/common';
import { FindMediaByOptions } from './dtos/find-media.dto';
import { MediaStatsObject } from './media.controller';
import { MediaDAO } from './media.dao';

type CategoryStats = Record<string, number>;
type CountType = Record<string, Number>;

@Injectable()
// Faz a logica de negocios: Transforma os dados do DTO e se comunica com DAO
export class MediaService {
  constructor(private dao: MediaDAO) {}

  // Rota que se comunica com o banco
  getMedias(userId: number, from?: Date, to?: Date) {
    return this.dao.findByUser(userId, from, to).then((medias) => {
      return medias.map((media) => {
        return {
          ...media,
          type: media.type ? 'Série' : 'Filme',
        };
      });
    });
  }

  getMediaById(userId: number, id: number) {
    return this.dao.findById(userId, id);
  }

  createMedia(media: Media) {
    return this.dao.create(media);
  }

  deleteMedia(userId: number, id: number) {
    return this.dao.delete(userId, id);
  }

  updateMedia(media: Media) {
    return this.dao.update(media);
  }

  // Obter os endpoints para o dashboard de horas gastas
  async getHoursStats(
    userId: number,
    by: FindMediaByOptions = FindMediaByOptions.day,
    from?: Date,
    to?: Date,
  ): Promise<MediaStatsObject> {
    const medias = await this.getMedias(userId, from, to);

    return medias.reduce((acc, media) => {
      const key = this.getKey(by, media.date);
      acc[key] = acc[key] || 0;
      acc[key] += media.duration;
      return acc;
    }, {});
  }

  // Obter os endpoints para o dashboard de categorias
  async getCategoriesStats(
    userId: number,
  ): Promise<Record<string, CategoryStats>> {
    // obtendo as mídias
    const medias = await this.getMedias(userId);
    // agrupando as mídias por categoria e tipo
    const stats: Record<string, CategoryStats> = {};

    for (const media of medias) {
      const category = media.category.name;

      const type = media.type === 'Série' ? 'series' : 'filmes';

      if (!stats[category]) {
        stats[category] = {};
      }

      if (!stats[category][type]) {
        stats[category][type] = 0;
      }

      stats[category][type] += 1;
    }

    return stats;
  }

  // Função para contar o número de filmes e séries e retornar o nome e a quantidade
  async getMoviesAndSeriesCount(
    userId: number,
  ): Promise<Record<string, CountType>> {
    // Obtendo o histórico de mídias do usuário
    const medias = await this.getMedias(userId);

    // Usando reduce para contar filmes e séries
    const count = medias.reduce((acc, media) => {
      if (media.type === 'movie') {
        acc['Filme'] = (acc['Filme'] || 0) + 1; // Conta filmes
      } else if (media.type === 'series') {
        acc['Série'] = (acc['Série'] || 0) + 1; // Conta séries
      }
      return acc;
    }, {});
    console.log();

    return count; // Retorna o objeto com a contagem de filmes e séries
  }

  private getKey(by: FindMediaByOptions, date: Date) {
    const isoDate = date.toISOString();

    switch (by) {
      case FindMediaByOptions.day:
        return isoDate.slice(0, 10);
      case FindMediaByOptions.month:
        return isoDate.slice(0, 7);
      case FindMediaByOptions.year:
        return isoDate.slice(0, 4);
    }
  }
}
