import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { AuthGuard } from '@/auth/auth.guard';
import { History } from '@entities/history.entity';

import { DeleteResult } from 'typeorm';
import { CreateHistoryDTO } from './dto/create-history.dto';
import { FindHistoryDTO } from './dto/find-history.dto';
import { HistoryService } from './history.service';

@UseGuards(AuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @Get()
  getHistory(@Req() req, @Query() query: FindHistoryDTO) {
    // Busca userId no token jwt
    const userId = Number(req.user.sub);

    return this.service.getHistory(userId, query.from, query.to);
  }

  // Rota para o dashboard por agrupamento temporal
  @Get('/dashboard/date')
  getHistoryByDate(@Req() req, @Query() query: FindHistoryDTO) {
    const userId = Number(req.user.sub);

    return this.service.getHistoryByDate(
      userId,
      query.from,
      query.to,
      query.by,
    );
  }

  // Rota para o dashboard por agrupamento de categorias
  @Get('/dashboard/categories')
  getHistoryByCategories(@Req() req, @Query() query: FindHistoryDTO) {
    const userId = Number(req.user.sub);

    return this.service.getHistoryByCategories(userId, query.from, query.to);
  }
  // Rota para o dashboard por agrupamento de tipo de midia
  @Get('/dashboard/types')
  getHistoryByMediaTypes(@Req() req, @Query() query: FindHistoryDTO) {
    const userId = Number(req.user.sub);

    return this.service.getHistoryByMediaType(userId, query.from, query.to);
  }

  // Rota para criar novo historico
  @Post()
  async createHistory(@Body() history: CreateHistoryDTO, @Res() res: Response) {
    return await this.service
      .createHistory(history.toEntity())
      .then((history: History) => {
        return res.send(history);
      })
      .catch((e: Error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(`History could not be created: ${e.message}`);
      });
  }

  // Rota para deletar historico
  @Delete(':id')
  async deleteHistory(
    @Param('id') id: number,
    @Req() req,
    @Res() res: Response,
  ) {
    const userId = req.user.sub;

    return await this.service
      .deleteHistory(id, userId)
      .then((result: DeleteResult) => {
        return res.send(result);
      })
      .catch((e: Error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(`History could not be deleted: ${e.message}`);
      });
  }
}
