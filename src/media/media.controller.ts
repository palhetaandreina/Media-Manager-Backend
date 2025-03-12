import { AuthGuard } from '@/auth/auth.guard';
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
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMediaDTO } from './dtos/create-media.dto';
import { FindMediaDTO } from './dtos/find-media.dto';
import { UpdateMediaDTO } from './dtos/update-media.dto';
import { MediaService } from './media.service';

export type MediaStatsObject = Record<string, number>;

/// Cria as rotas de requisicao e valida os dados de entrada
@UseGuards(AuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Get()
  getMedias(@Req() req, @Query() query: FindMediaDTO) {
    return this.service.getMedias(req.user.sub, query.from, query.to);
  }

  // http://locahost:8000/media/:id
  @Get(':id')
  // Buscando midia por id
  async getMediaById(
    @Param('id') id: number,
    @Req() req,
    @Res() res: Response,
  ) {
    const media = await this.service.getMediaById(req.user.sub, id);

    // Verificando se a midia existe e retornando um status http
    if (media != null) {
      return res.send(media);
    }

    return res.status(HttpStatus.NOT_FOUND).send(`Media not found`);
  }

  @Post()
  // Criando nova midia e retornando um status http em caso de falha
  async createMedia(
    @Body() media: CreateMediaDTO,
    @Req() req,
    @Res() res: Response,
  ) {
    return await this.service
      .createMedia(media.toEntity(req.user.sub))
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
  deleteMedia(@Param('id') id: number, @Req() req) {
    return this.service.deleteMedia(req.user.sub, id);
  }

  @Patch()
  async updateMedia(@Body() media: UpdateMediaDTO, @Req() req) {
    const updatedMedia = media.toEntity(req.user.sub);
    await this.service.updateMedia(updatedMedia);
    return updatedMedia;
  }
  // Busca as informações pela query e retorna essas info como objeto
  // http://localhost://8000/media/stats/hours?from=&to&by=
  @Get('/stats/hours')
  getHoursStats(
    // ?from=&to&by=
    @Query() query: FindMediaDTO,
    @Req() req,
    // Retorno da função -> Promise<MediaStatsObject>
  ): Promise<MediaStatsObject> {
    const userId = req.user.sub;

    return this.service.getHoursStats(userId, query.by, query.from, query.to);
  }

  @Get('/stats/category')
  getCategoriesStats(
    @Req() req,
    // Retorno da função -> Promise<MediaStatsObject>
  ) {
    const userId = req.user.sub;

    return this.service.getCategoriesStats(userId);
  }
}
