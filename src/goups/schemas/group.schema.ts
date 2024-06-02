import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from '../../channels/schemas/channel.schema';
import { Tenant } from '../../tenants/schemas/tenants.schema';
import { User } from '../../user/schemas/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the Group',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the Group',
    })
    __v: number;

    @ApiProperty({
        example: '#Allgemein',
        description: 'Name of the Group',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Group',
    })
    @Prop({ default: null })
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Group',
    })
    @Prop({ default: null })
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Group',
    })
    @Prop({ default: null })
    icon: string;

    @ApiProperty({
        description: 'Division of the Group',
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Division' })
    division: Tenant;

    @ApiProperty({
        description: 'Owners of the Group',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    owners: User[];

    @ApiProperty({
        description: 'Members of the Group',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: User[];

    @ApiProperty({
        description: 'Groups of the Group',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }])
    channels: Channel[];

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
        description: 'Created At of the Group',
    })
    @Prop()
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Group',
    })
    @Prop()
    updatedAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'DeleteAt of the Group',
    })
    @Prop()
    deletedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
