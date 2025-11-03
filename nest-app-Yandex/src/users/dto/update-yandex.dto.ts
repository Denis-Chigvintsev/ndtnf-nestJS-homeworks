import { Optional } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

export class UpdateYandexDto {
  @IsEmail()
  email?: string;

  @Optional()
  id?: string;

  @Prop()
  y_Id?: string;

  @Prop()
  y_name?: string;

  @Prop()
  y_accessToken?: string = '';

  @Prop()
  y_refreshToken?: string = '';

  @Prop()
  role?: string;

  @Optional()
  session?: string;
}
