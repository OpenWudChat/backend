import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: GroupsService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Groups] [Listeners] [mock.delete] EventData');
        try {
            // Delete Demo Groups
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.groups] Fehler:');
            console.error(e);
        }
    }
}
