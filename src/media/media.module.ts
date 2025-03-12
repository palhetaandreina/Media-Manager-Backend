import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaController } from './media.controller';
import { MediaDAO } from './media.dao';
import { MediaService } from './media.service';

import { Media } from '@entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService, MediaDAO],
  exports: [MediaService],
})
export class MediaModule {}
