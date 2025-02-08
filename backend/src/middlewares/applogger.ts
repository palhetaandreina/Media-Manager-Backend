import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  // Instancia logger
  private logger = new Logger('HTTP');

  // Metodo executado do NestMiddleware
  use(request: Request, response: Response, next: NextFunction): void {
    // Recuperando informacoes do request
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    // Escutando a resposta do server (response)
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      // Logando sobre o request
      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    // Executando proxima acao depois do middleware
    next();
  }
}
