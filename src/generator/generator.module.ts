import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@entities/category.entity';
import { History } from '@entities/history.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';
import { GeneratorService } from './generator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([History]),
  ],
  providers: [GeneratorService],
})
export class GeneratorModule {}
