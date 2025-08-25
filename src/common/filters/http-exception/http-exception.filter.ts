/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

let error: any;

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/unbound-method
    response
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .status(status)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/unbound-method
      .json({
        timestamp: new Date().toString(),
        result: 'failure',
        data: exception.message,
        code: status,
      });
  }
}
