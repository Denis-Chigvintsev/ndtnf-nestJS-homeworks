import { Injectable } from '@nestjs/common';
import { catchError, debounceTime, from, switchMap } from 'rxjs';

@Injectable()
export class RcService {
  getCounty(capital: any) {
    return from(
      fetch(`https://restcountries.com/v3.1/capital/${capital}`).catch(
        (error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return error;
        },
      ),
    ).pipe(
      debounceTime(1000),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      switchMap((res) => res.json()),
      catchError((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return error;
      }),
    );
  }
}
