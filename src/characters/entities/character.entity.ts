import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Character extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  modified: 'string';

  @Prop()
  thubnail: 'string';

  @Prop([String])
  comics: string[];

  @Prop()
  id?: string = '';
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
