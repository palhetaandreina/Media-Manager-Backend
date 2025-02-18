import { AuthGuard } from '@/auth/auth.guard';
import { User } from '@entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // buscar um usuário por id
  @Get()
  getUserById(@Req() req) {
    return this.service.getUserById(req.user.sub);
  }

  // Criar um novo usuário e respondendo com um status http
  @Post()
  async createUser(@Body() user: CreateUserDTO, @Res() res: Response) {
    return await this.service
      .createUser(user.toEntity())
      .then((user: User) => {
        return res.send(user);
      })
      .catch((e: Error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(`User could not be created: ${e.message}`);
      });
  }

  // Deletando um usuário por id
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }

  // Atualizando um usuário
  @Patch()
  updateUser(@Body() user: UpdateUserDTO) {
    return this.service.updateUser(user.toEntity());
  }
}
