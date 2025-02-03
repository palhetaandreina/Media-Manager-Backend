import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDAO } from './user.dao';

@Injectable()
export class UserService {
  constructor(private dao: UserDAO) {}

  getUsers() {
    return this.dao.find();
  }

  getUserById(id: number) {
    return this.dao.findById(id);
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
}
