import { Controller, Get, Param } from '@nestjs/common';
import { RcService } from './rc.service';

@Controller('rc')
export class RcController {
  constructor(private readonly rcService: RcService) {}

  @Get(`:capital`) //на restcountries.com -- вводим столу получаем выписку о стране, например localhost/rc/ottawa или localhost/rc/moscow
  getCountry(@Param() param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.rcService.getCounty(param.capital);
  }
}
