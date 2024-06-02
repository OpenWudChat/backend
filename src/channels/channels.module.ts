import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './schemas/channel.schema';
import { Tenant, TenantsSchema } from '../tenants/schemas/tenants.schema';
import { Group, GroupSchema } from '../goups/schemas/group.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import { MockDeleteListener } from './listeners/mock-delete.listener';
import {GroupCreateListener} from "./listeners/group-created.listener";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Channel.name, schema: ChannelSchema },
            { name: Tenant.name, schema: TenantsSchema },
            { name: Group.name, schema: GroupSchema },
        ]),
    ],
    controllers: [ChannelsController],
    providers: [ChannelsService, MockCreateListener, MockDeleteListener, GroupCreateListener],
})
export class ChannelsModule {}
