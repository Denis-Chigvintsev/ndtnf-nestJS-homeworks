import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GhReqModule } from './gh_req/gh_req.module';
import { RcModule } from './rc/rc.module';

@Module({
  imports: [GhReqModule, RcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
