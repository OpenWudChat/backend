import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TenantsService } from '../tenants.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: TenantsService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Tenants] [Listeners] [mock.delete] EventData');
        try {
            // Delete Demo Tenants
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.tenants] Fehler:');
            console.error(e);
        }
    }
}
