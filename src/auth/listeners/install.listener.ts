import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {AuthService} from "../auth.service";

@Injectable()
export class InstallLuminaaListener {
    constructor(private readonly service: AuthService) {}

    @OnEvent('luminaa.install')
    async handleMockCreateEvent() {
        console.log('[EVENT] [INSTALL] [Auth-User] [Listeners] [luminaa.install] Execute!');

        try {
            return await this.service.register({
                email: 'admin@luminaa.chat',
                firstName: 'Admin',
                lastName: 'Admin',
                password: 'admin',
                roles: ['employee', 'admin', 'client', 'teamlead', 'user'],
            });
        } catch (e) {
            console.error('[EVENT] [INSTALL] [Auth-User] [Listeners] [luminaa.install]');
            console.error(e);
        }
    }
}
