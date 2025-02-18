import { AuthGuard } from '@/auth/auth.guard';
import { History } from '@entities/history.entity';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateHistoryDTO } from './dto/create-history.dto';
import { HistoryService } from './history.service';

@UseGuards(AuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  getHistory() {
    return this.service.getHistory();
  }

  // @Get(':id')
  // async getHistoryById(@Param('id') id: number, @Res() res: Response) {
  //   const history = await this.service.getHistoryById(id);

  //   if (history != null) {
  //     return res.send(history);
  //   }

  //   return res.status(HttpStatus.NOT_FOUND).send(`History not found`);
  // }

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
}
