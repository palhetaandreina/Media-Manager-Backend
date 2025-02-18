import { User } from '@entities/user.entity';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  public toEntity(): User {
    const user = new User();

    user.name = this.name;
    user.email = this.email;
    user.password = this.password;

    return user;
  }
}
