import { Media } from '@entities/media.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
// Data Access Object = Camada que acessa os dados do banco
export class MediaDAO {
  constructor(
    @InjectRepository(Media)
    private repository: Repository<Media>,
  ) {}

  findById(userId: number, id: number) {
    return this.repository.findOneBy({
      id: id,
      user: { id: userId },
    });
  }

  // Consultando em Media e retornando as colunas
  findByUser(userId: number, from?: Date, to?: Date) {
    const where = {
      user: {
        id: userId,
      },
    };

    if (from != undefined && to !== undefined) {
      where['date'] = Between(from, to);
    }

    return this.repository.find({
      where: where,
      order: {
        date: {
          direction: 'desc',
        },
      },
      relations: {
        category: true,
      },
    });
  }

  create(media: Media) {
    return this.repository.save(media);
  }

  update(media: Media) {
    return this.repository.update(
      {
        user: {
          id: media.user.id,
        },
        id: media.id,
      },
      media,
    );
  }

  delete(userId: number, id: number) {
    return this.repository.delete({
      id: id,
      user: {
        id: userId,
      },
    });
  }
}
