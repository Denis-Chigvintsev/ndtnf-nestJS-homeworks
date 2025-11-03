/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionGuard {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (req.session.id) {
      console.log('Урр');
      const foundInDatabase = await this.usersService.findOneBySessionId(
        req.session.id,
      );
      if (foundInDatabase) {
        console.log(
          `пропускаю тебя уважаемый ${foundInDatabase.y_name}`,
          foundInDatabase,
        );
        return true;
      }
    }
    return res.redirect('/authentication/yandex');
    //return true;
  }
}
