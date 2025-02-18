import { Media } from '@entities/media.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
// Data Access Object = Camada que acessa os dados do banco
export class MediaDAO {
  constructor(
    @InjectRepository(Media)
    private repository: Repository<Media>,
  ) {}

  findById(id: number) {
    return this.repository.findOneBy({
      id: id,
    });
  }

  find() {
    return this.repository.find();
  }

  create(media: Media) {
    return this.repository.save(media);
  }

  update(media: Media) {
    return this.repository.update(
      {
        id: media.id,
      },
      media,
    );
  }

  delete(id: number) {
    return this.repository.delete({
      id: id,
    });
  }
}
