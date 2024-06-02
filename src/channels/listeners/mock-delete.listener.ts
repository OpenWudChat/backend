import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChannelsService } from '../channels.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: ChannelsService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Channels] [Listeners] [mock.delete] EventData');
        try {
            // Delete Demo User
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.channels] Fehler:');
            console.error(e);
        }
    }
}
