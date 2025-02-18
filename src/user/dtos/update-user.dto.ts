import { User } from '@entities/user.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

// Dto vai validar os valores do request
export class UpdateUserDTO {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  // Transforma o dto em entidades
  public toEntity(): User {
    const user = new User();

    user.id = this.id;
    user.name = this.name;
    user.email = this.email;
    user.password = this.password;

    return user;
  }
}
