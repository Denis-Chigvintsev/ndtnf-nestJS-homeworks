import { Controller, Get, Param } from '@nestjs/common';
import { GhReqService } from './gh_req.service';

@Controller('gh-req')
export class GhReqController {
  gh_req: any;

  constructor(private readonly ghReqService: GhReqService) {}
  @Get()
  getAll() {
    return 'привет Мир  ';
  }
  @Get(`:param1`)
  // вводим login - например 1234 или 135 или 123 ...
  getOne(@Param() param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return this.ghReqService.getOne(param.param1);
  }
}
