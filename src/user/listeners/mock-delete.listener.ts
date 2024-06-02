import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from '../user.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: UsersService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [MOCK] [Users] [Listeners] [mock.create.roles] EventData');
        try {
            // Delete Demo User
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.users] Fehler:');
            console.error(e);
        }
    }
}
