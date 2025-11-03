/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SighUpDto } from './dto/sigh-up.dto/sigh-up.dto';
import { SighInDto } from './dto/sigh-in.dto/sigh-in.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @SetMetadata('isPublic', true)
  @Post('sign-up')
  signUp(@Body() signUpDto: SighUpDto) {
    console.log('sign-up');
    return this.authenticationService.signUp(signUpDto);
  }

  @SetMetadata('isPublic', true)
  @Post('sign-in')
  signIn(@Body() signInDto: SighInDto) {
    return this.authenticationService.signIn(signInDto);
  }
}
