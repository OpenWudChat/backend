import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "../../user/schemas/user.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @ApiProperty({
    example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
    description: 'ID of the Message',
  })
  _id: string;

  @ApiProperty({
    example: 23,
    description: 'Version of the Message',
  })
  __v: number;

  @ApiProperty({
    example: 'Hello World',
    description: 'Message of the Message',
  })
  @Prop()
  message: string;

  @ApiProperty({
    description: 'Sender of the Message',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;

  @ApiProperty({
    description: 'Receiver of the Message',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: User;

  @ApiProperty({
    example: 'channel | direct',
    description: 'Type of the Message',
  })
  @Prop({ default: 'direct' })
  type: string;

  @ApiProperty({
    example: '2023-05-19T16:21:28.120Z',
    description: 'Delivered At of the Message',
  })
  @Prop({ default: null })
  deliveredAt: Date;

  @ApiProperty({
    example: '2023-05-19T16:21:28.120Z',
    description: 'Seen At of the Message',
  })
  @Prop({ default: null })
  seenAt: Date;

  @ApiProperty({
    example: '2023-05-19T16:21:28.120Z',
    description: 'Created At of the Message',
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-19T16:21:28.120Z',
    description: 'Updated At of the Message',
  })
  @Prop()
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
