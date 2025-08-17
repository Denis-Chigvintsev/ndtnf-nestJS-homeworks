import { Module } from '@nestjs/common';
import { RcController } from './rc.controller';
import { RcService } from './rc.service';

@Module({ controllers: [RcController], providers: [RcService] })
export class RcModule {}
