import { Media } from '@entities/media.entity';
import { Injectable } from '@nestjs/common';
import { MediaDAO } from './media.dao';

@Injectable()
// Faz a logica de negocios: Transforma os dados do DTO e se comunica com DAO
export class MediaService {
  constructor(private dao: MediaDAO) {}

  getMedias() {
    return this.dao.find();
  }

  getMediaById(id: number) {
    return this.dao.findById(id);
  }

  createMedia(media: Media) {
    return this.dao.create(media);
  }

  deleteMedia(id: number) {
    return this.dao.delete(id);
  }

  updateMedia(media: Media) {
    return this.dao.update(media);
  }
}
