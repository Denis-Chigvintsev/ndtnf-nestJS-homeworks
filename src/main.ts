import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
//import { StatusInterceptor } from './common/interceptors/status/status.interceptor';
//import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  //app.useGlobalInterceptors(new StatusInterceptor());

  await app.listen(process.env.PORT as string);
}
bootstrap();
