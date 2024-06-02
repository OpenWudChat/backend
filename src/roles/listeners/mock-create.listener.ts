import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RolesService } from '../roles.service';

@Injectable()
export class MockCreateListener {
    constructor(private readonly service: RolesService) {}

    @OnEvent('mock.create.roles')
    async handleMockCreateEvent() {
        console.log('[EVENT] [MOCK] [Roles] [Listeners] [mock.create.roles] EventData');

        try {
            await this.service.create({
                name: 'employee',
            });
            await this.service.create({
                name: 'teamlead',
            });
            await this.service.create({
                name: 'client',
            });
            await this.service.create({
                name: 'admin',
            });
            await this.service.create({
                name: 'user',
            });
        } catch (e) {
            console.error('[EVENT] [mock.create.roles] Fehler:');
            console.error(e);
        }
    }
}
