import { Controller, Get, Param } from '@nestjs/common';
import { GhReqService } from './gh_req.service';

@Controller('gh-req')
export class GhReqController {
  constructor(private readonly ghReqService: GhReqService) {}

  @Get(`:param1`)
  // вводим login - например 1234 или 135 или 123 ... то есть localhost/gh-req/123
  getOne(@Param() param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return this.ghReqService.getOne(param.param1);
  }
}
