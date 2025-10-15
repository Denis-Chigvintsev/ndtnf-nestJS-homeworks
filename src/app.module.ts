/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    CharactersModule,
    ConfigModule.forRoot(),
    //MongooseModule.forRoot(process.env.MONGO_CONNECTION as string),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_PRODUCTION as string, {
      tls: true,
      //  tlsCAFile: process.env.TLSCAFILE,
      tlsCAFile: 'tmp/root.crt',
      replicaSet: 'rs01',
      authSource: 'db1',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
