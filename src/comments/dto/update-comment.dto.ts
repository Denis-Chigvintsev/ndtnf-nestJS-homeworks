import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsString()
  @Optional()
  bookId?: string;

  @IsString()
  @Optional()
  comment?: string;

  @IsString()
  @Optional()
  id?: string = '';
}
