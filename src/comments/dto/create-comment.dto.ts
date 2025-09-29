import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  bookId: string;
  @IsString()
  comment: string;

  @IsString()
  @Optional()
  id?: string = '';
}
