import { AuthGuard } from '@/auth/auth.guard';
import { Category } from '@entities/category.entity';
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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  getCategory() {
    return this.service.getCategory();
  }

  @Post()
  async createCategory(
    @Body() category: CreateCategoryDTO,
    @Res() res: Response,
  ) {
    return await this.service
      .createCategory(category.toEntity())
      .then((category: Category) => {
        return res.send(category);
      })
      .catch((e: Error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(`Category could not be created: ${e.message}`);
      });
  }

  @Patch()
  updateCategory(@Body() category: UpdateCategoryDTO) {
    return this.service.updateCategory(category.toEntity());
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.service.deleteCategory(id);
  }
}
