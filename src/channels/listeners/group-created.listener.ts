import { Injectable } from '@nestjs/common';
import {EventEmitter2, OnEvent} from '@nestjs/event-emitter';
import { ChannelsService } from '../channels.service';
import { CreateChannelDto } from '../dto/create-channel.dto';

@Injectable()
export class GroupCreateListener {
    constructor(private readonly service: ChannelsService,
                private eventEmitter: EventEmitter2,) {}

    @OnEvent('group.created')
    async handleMockCreateEvent(event: {
        minRole: any,
        members: any,
        owners: any,
        tenant: any,
        group: any,
    }) {
        console.log('[EVENT] [Channels] [Listeners] [group.created] EventData');
        try {
            // console.log(event.group)
            const newChannel = await this.service.create({
                name: 'Allgemein',
                description: 'Channel für Allgemeinen austausch',
                color: '#000000',
                icon: 'fa fa-hashtag',
                tenant: event.tenant,
                group: event.group,
                messages: [],
                members: event.members,
                owners: event.owners,
                minRole: event.minRole,
                visible: true,
            } as CreateChannelDto);

            // TODO: Hier müssen noch Fake Nachrichten eingefügt werden
            // this.eventEmitter.emit('mock.create.channels', {
            //     users: event.users,
            //     tenant: event.tenant,
            //     group: event.group,
            //     channel: channel,
            // });

            this.eventEmitter.emit('channel.created', {
                tenant: event.tenant,
                group: event.group,
                channel: newChannel,
            });
        } catch (e) {
            console.log('[EVENT] [Channels] [Listeners] [group.created] Fehler: ');
            console.error(e);
        }
    }
}
