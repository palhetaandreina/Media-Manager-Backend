import { History } from '@entities/history.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryDAO } from './history.dao';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService, HistoryDAO],
  controllers: [HistoryController],
})
export class HistoryModule {}
