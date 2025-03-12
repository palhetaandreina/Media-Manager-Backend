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

  // Disabled for tesint
  // @IsEmail()
  @IsString()
  email: string;

  // Transforma o dto em entidades
  public toEntity(): User {
    const user = new User();

    user.id = this.id;
    user.name = this.name;
    user.email = this.email;

    return user;
  }
}
