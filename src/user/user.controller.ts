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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.service.getUserById(id);
  }

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

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }

  @Patch()
  updateUser(@Body() user: UpdateUserDTO) {
    return this.service.updateUser(user.toEntity());
  }
}
