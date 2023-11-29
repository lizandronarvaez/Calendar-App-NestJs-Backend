import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({
    unique: true,
    type: String,
    required: true,
  })
  client: string;

  @Prop({
    type: String,
    required: true,
  })
  service: string;

  @Prop({
    type: Date,
    required: true,
  })
  start: Date;

  @Prop({
    type: Date,
    required: true,
  })
  end: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
