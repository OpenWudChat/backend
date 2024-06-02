import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '../../messages/schemas/message.schema';
import { User } from '../../user/schemas/user.schema';
import { Tenant } from '../../tenants/schemas/tenants.schema';

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the Channel',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the Channel',
    })
    __v: number;

    @ApiProperty({
        example: '#Allgemein',
        description: 'Name of the Channel',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Channel',
    })
    @Prop({ default: null })
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Channel',
    })
    @Prop({ default: null })
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Channel',
    })
    @Prop({ default: null })
    icon: string;

    @ApiProperty({
        description: 'Messages of the Channel',
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' })
    tenant: Tenant;

    @ApiProperty({
        description: 'Messages of the Channel',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
    messages: Message[];

    @ApiProperty({
        description: 'Owners of the Channel',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    owners: User[];

    @ApiProperty({
        description: 'Members of the Channel',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: User[];

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Min Role of User for this Channel',
    })
    @Prop({ default: 'SUPERVISOR' })
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this channel currently visible?',
    })
    @Prop({ default: true })
    visible: boolean;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the Channel',
    })
    @Prop()
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Channel',
    })
    @Prop()
    updatedAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'DeleteAt of the Channel',
    })
    @Prop()
    deletedAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
