import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@entities/category.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';

import { AppLoggerMiddleware } from '@middlewares/applogger';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { GeneratorModule } from './generator/generator.module';
import { MediaModule } from './media/media.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Media, Category],
      synchronize: true,
    }),
    MediaModule,
    UserModule,
    CategoryModule,
    AuthModule,
    GeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
