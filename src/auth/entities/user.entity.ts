import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class Auth extends Document {
  @Prop({
    type: String,
    required: true,
  })
  fullname: string;

  @Prop({
    unique: true,
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

// Metodo para encriptar la password
AuthSchema.pre('save', async function () {
  try {
    if (this.isNew || this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  } catch (error) {
    throw new Error(error);
  }
});
