import { User } from '@entities/user.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  public toEntity(): User {
    const user = new User();

    user.name = this.name;
    user.email = this.email;
    user.password = this.password;

    return user;
  }
}
