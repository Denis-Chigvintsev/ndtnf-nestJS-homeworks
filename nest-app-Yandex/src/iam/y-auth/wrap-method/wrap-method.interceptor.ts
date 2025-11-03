/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Request } from 'express';

@Injectable()
export class WrapMethodInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.switchToHttp().getRequest().url);

    return next.handle().pipe(tap((data) => console.log('After', data)));
  }
}
