import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RolesService } from '../roles.service';

@Injectable()
export class InstallLuminaaListener {
    constructor(private readonly service: RolesService) {}

    @OnEvent('luminaa.install')
    async handleMockCreateEvent() {
        console.log('[EVENT] [INSTALL] [Roles] [Listeners] [luminaa.install] Execute!');

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
            console.error('[EVENT] [INSTALL] [Roles] [Listeners] [luminaa.install]');
            console.error(e);
        }
    }
}
