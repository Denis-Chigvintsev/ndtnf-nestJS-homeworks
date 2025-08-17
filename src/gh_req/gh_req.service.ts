import { Injectable } from '@nestjs/common';

import { from } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';

@Injectable()
export class GhReqService {
  getOne(param: any): any {
    return from(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      fetch(`https://api.github.com/users/${param}`).catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return error;
      }),
    ).pipe(
      debounceTime(500),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      switchMap((res: any) => res.json()),
      catchError((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return error;
      }),
    );
  }
}
