/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, MinLength } from 'class-validator';

export class SighInDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}
