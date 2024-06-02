import { Module } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway';
import { Message, MessageSchema } from '../messages/schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { ChannelsListener } from './listeners/channels.listener';
import { GroupsListener } from './listeners/groups.listener';
import { TenantListener } from './listeners/tenants.listener';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
    providers: [
        SocketsGateway,
        ChannelsListener,
        GroupsListener,
        TenantListener,
    ],
})
export class SocketsModule {}
