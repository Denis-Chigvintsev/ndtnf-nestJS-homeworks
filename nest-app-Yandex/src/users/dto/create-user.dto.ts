import { Optional } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @MinLength(5)
  password?: string;

  @Optional()
  id?: string;

  @Optional()
  token?: string;

  @Optional()
  role?: string;
}
