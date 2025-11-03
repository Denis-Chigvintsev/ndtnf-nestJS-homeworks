import { Optional } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';

export class YandexDTO {
  @IsEmail()
  email?: string;

  @MinLength(5)
  password?: string;

  @Optional()
  id?: string;

  @Optional()
  token?: string;

  @Optional()
  yandex?: string;

  @Optional()
  session?: string;
}
