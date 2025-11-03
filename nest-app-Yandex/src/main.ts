/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//import { WrapMethodInterceptor } from './iam/y-auth/wrap-method/wrap-method.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalInterceptors(new WrapMethodInterceptor());

  app.use(
    session({
      name: 'nestJS_ses_ID',
      secret: 'HelloWorld_FuckingStrongest', // Replace with a strong, randomly generated secret
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 300000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
