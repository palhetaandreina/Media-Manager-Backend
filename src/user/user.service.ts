import { jwtConstants } from '@/auth/constants';
import { User } from '@entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDAO } from './user.dao';

@Injectable()

// Transformando os dados do dto e se comunicando com o dao
export class UserService {
  constructor(
    private readonly dao: UserDAO,
    private readonly jwtService: JwtService,
  ) {}

  getUsers() {
    return this.dao.find();
  }

  getUserById(id: number) {
    return this.dao.findById(id);
  }

  getUserByEmail(email: string) {
    return this.dao.findByEmail(email);
  }

  createUser(user: User) {
    return this.dao.create(user);
  }

  deleteUser(id: number) {
    return this.dao.delete(id);
  }

  updateUser(user: User) {
    return this.dao.update(user);
  }

  async updatePassword(token: string, password: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    const userId = payload.sub;

    if (!userId) {
      throw new UnauthorizedException('Token invalido');
    }

    return this.dao.updatePassword(userId, password);
  }
}
