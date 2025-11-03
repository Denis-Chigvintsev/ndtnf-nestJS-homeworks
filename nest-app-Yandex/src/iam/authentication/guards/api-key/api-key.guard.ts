/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { HashingService } from 'src/iam/hashing/hashing.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = await this.reflector.get('isPublic', context.getHandler());
    if (isPublic == true) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.header('id');
    const secret = request.header('secret');
    if (secret && secret != '') {
      if (id) {
        const foundUser = await this.usersService.findOne(id);
        const hashedtoken = foundUser?.token;
        if (hashedtoken) {
          const isEqual = await this.hashingService.compare(
            secret,
            hashedtoken,
          );
          if (isEqual) {
            return true;
          } else {
            throw new UnauthorizedException();
          }
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }

    return true;
  }
}
