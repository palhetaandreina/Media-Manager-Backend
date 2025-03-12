import { User } from '@entities/user.entity';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  // Disabled for tesint
  // @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
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
