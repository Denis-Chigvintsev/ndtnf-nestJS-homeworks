import { Injectable } from '@nestjs/common';
import { debounceTime, from, switchMap } from 'rxjs';

@Injectable()
export class RcService {
  getCounty(capital: any) {
    return from(
      fetch(`https://restcountries.com/v3.1/capital/${capital}`),
    ).pipe(
      debounceTime(1000),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      switchMap((res) => res.json()),
    );
  }
}
