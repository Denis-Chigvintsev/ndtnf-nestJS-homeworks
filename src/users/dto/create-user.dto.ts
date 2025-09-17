import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @Optional()
  id?: string;
  @Optional()
  name?: string;
  email: string;
  password: string;
}
