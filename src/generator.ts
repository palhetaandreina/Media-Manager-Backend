import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GeneratorService } from './generator/generator.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(GeneratorService);

  service.run();
}
bootstrap();
