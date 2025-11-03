/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Optional } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';

export class SighUpDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @Optional()
  token?: string = '';
}
