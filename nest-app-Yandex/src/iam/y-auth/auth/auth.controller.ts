/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import {
  Controller,
  Get,
  Req,
  SetMetadata,
  UseGuards,
  Session,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Cookie } from 'express-session';
import { UsersService } from 'src/users/users.service';
import { use } from 'passport';

@Controller('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('yandex'))
  @Get('yandex')
  async yandexAuth() {
    // Initiates Yandex authentication
    //return this.authService.profile();
  }

  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('yandex'))
  @Get('yandex/callback')
  async yandexAuthCallback(@Req() req, @Res() res) {
    // User data is available in req.user after successful authentication

    req.session.user = req.user;
    console.log(1, 1, 1, req.user);
    req.user.session = req.session;

    req.user.session = '';
    req.user.sessionId = req.session.id;
    console.log(800, 800, 800, req.user);
    await this.userService.Y_update(req.user.id, req.user);
    await res.redirect('http://localhost:3000/pullAll');

    return req.user;
  }

  @SetMetadata('isPublic', true)
  @Get('ses')
  async getAuthSession(@Session() session: Record<string, any>, @Req() req) {
    console.log(session);
    console.log(session.id);
    console.log(12, req.cookies);
    const sesID = req.session.id;
    console.log(13, sesID);
    // session.authenticated = true;
    return session;
  }

  @SetMetadata('isPublic', true)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
