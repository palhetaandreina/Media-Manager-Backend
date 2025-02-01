import { Media } from '@entities/media.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { MediaService } from './media.service';

/// Criando rotas de requisicao e valida os dados de entrada
@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Get()
  getMedias() {
    return this.service.getMedias();
  }

  @Get(':id')
  // Buscando midia por id
  async getMediaById(@Param('id') id: number, @Res() res: Response) {
    const media = await this.service.getMediaById(id);

    // Verificando se a midia existe e retornando um status http
    if (media != null) {
      return res.send(media);
    }

    return res.status(HttpStatus.NOT_FOUND).send(`Media not found`);
  }

  @Post()
  // Criando nova midia e retornando um status http em caso de falha
  async createMedia(@Body() media: CreateMediaDto, @Res() res: Response) {
    return await this.service
      .createMedia(media.toEntity())
      .then((media: Media) => {
        return res.send(media);
      })
      .catch((e: Error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(`Media could not be created: ${e.message}`);
      });
  }

  @Delete(':id')
  deleteMedia(@Param('id') id: number) {
    return this.service.deleteMedia(id);
  }

  @Patch()
  updateMedia(@Body() media: UpdateMediaDto) {
    return this.service.updateMedia(media.toEntity());
  }
}
