import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @MinLength(3)
  @IsString()
  password: string;
}
