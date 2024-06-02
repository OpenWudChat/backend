import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TenantsService } from '../tenants.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: TenantsService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Divisions] [Listeners] [mock.delete] EventData');
        try {
            // Delete Demo Divisions
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.divisions] Fehler:');
            console.error(e);
        }
    }
}
