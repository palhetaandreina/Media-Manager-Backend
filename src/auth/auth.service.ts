import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Passando os valores para gerar o token jwt
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(email);

    // Verificando se a senha esta autenticada
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
