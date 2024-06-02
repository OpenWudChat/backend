import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ChannelsListener {
    constructor() {}

    @OnEvent('channel.created')
    async handleChannelCreatedEvent(event: any) {
        try {
            console.log(
                '[EVENTS] [Sockets] [ChannelsListener] [channel.created] EventData: ',
                // event,
            );
        } catch (e) {
            console.error(e);
        }
    }
}
