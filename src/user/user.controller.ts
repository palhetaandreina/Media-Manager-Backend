import { AuthGuard } from '@/auth/auth.guard';
import { User } from '@entities/user.entity';
import {
  BadRequestException,
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
import { ResetPasswordService } from './reset-password.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly passwordService: ResetPasswordService,
  ) {}

  // buscar um usuário por id
  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }

  // Atualizando um usuário

  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@Body() user: UpdateUserDTO) {
    return this.service.updateUser(user.toEntity());
  }

  @Patch('reset-password')
  async updatePassword(@Body() body: Record<string, any>) {
    if (!body.token) {
      throw new BadRequestException('Token não fornecido');
    }

    return this.service.updatePassword(body.token, body.password);
  }

  @Post('send-reset-password-email')
  sendResetPasswordEmail(
    @Body() body: Record<string, any>,
    @Res() res: Response,
  ) {
    return this.passwordService
      .sendResetEmail(body.email)
      .then((token) => {
        res.status(HttpStatus.OK);
        return res.send(token);
      })
      .catch((e) => {
        res.status(HttpStatus.BAD_REQUEST);
        return res.send(e?.message);
      });
  }
}
