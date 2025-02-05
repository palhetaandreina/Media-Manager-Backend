import { Category } from '@entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryDAO } from './category.dao';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryDAO],
  controllers: [CategoryController],
})
export class CategoryModule {}
