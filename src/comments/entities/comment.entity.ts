import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop()
  bookId: string;

  @Prop()
  comment: string;

  @Prop()
  id: string = '';
}
export const BookComment = SchemaFactory.createForClass(Comment);
