import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDAO } from './user.dao';

@Injectable()

// Transformando os dados do dto e se comunicando com o dao
export class ResetPasswordService {
  transporter: nodemailer.Transporter;

  constructor(
    private dao: UserDAO,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        // Fake email for testing
        user: 'dusty.predovic@ethereal.email',
        pass: 'cqdPnUbK8HxHZ3EVZU',
      },
    });
  }

  async sendResetEmail(email: string) {
    const user = await this.dao.findByEmail(email);

    if (!user) {
      throw new Error('Email não encontrado');
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    const html = `
      <div style="display: flex; flex-direction: column;">
        <h3>Olá, ${user.name}</h3>
        <p style="margin: 0;">Você solicitou a alteração da senha</p>
        <p style="margin: 0;">Para seguir com a ação, <a href="http://localhost:5173/user/reset-password?token=${token}">clique aqui</a></p>
        <p>Caso não tenha solicitado, ignorar este email</p>
      </div>`;

    // return await this.transporter
    //   .sendMail({
    //     from: '"Gerenciamento de mídia" <dusty.predovic@ethereal.email>', // sender address
    //     to: user.email, // list of receivers
    //     subject: 'Recuperação de senha', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: html, // html body
    //   })
    //   .then((e) => {
    //     console.log(e);
    //   })
    //   .catch((e) => console.error(e));

    return token;
  }
}
