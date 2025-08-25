import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  authors: string[];

  @Prop()
  favorite?: boolean;

  @Prop()
  fileCover?: string;

  @Prop()
  fileName?: string;

  @Prop()
  fileBook?: string;

  @Prop()
  id: string = '';
}

export const BookSchema = SchemaFactory.createForClass(Book);
