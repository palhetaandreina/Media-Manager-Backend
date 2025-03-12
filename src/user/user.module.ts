import { User } from '@entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from '@/auth/constants';
import { ResetPasswordService } from './reset-password.service';
import { UserController } from './user.controller';
import { UserDAO } from './user.dao';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserDAO, ResetPasswordService],
  exports: [UserService],
})
export class UserModule {}
