import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Prop()
  id?: string = '';

  @Prop()
  token?: string = '';

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

  @Prop({})
  session?: string;

  @Prop({})
  sessionId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
