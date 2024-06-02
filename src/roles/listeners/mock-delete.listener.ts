import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RolesService } from '../roles.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: RolesService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Roles] [Listeners] [mock.delete] EventData');
        try {
            // Delete Demo Roles
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.roles] Fehler:');
            console.error(e);
        }
    }
}
