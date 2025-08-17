import { Module } from '@nestjs/common';
import { GhReqController } from './gh_req.controller';
import { GhReqService } from './gh_req.service';

@Module({ controllers: [GhReqController], providers: [GhReqService] })
export class GhReqModule {}
