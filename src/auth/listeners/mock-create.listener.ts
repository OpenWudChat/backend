import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MockCreateListener {
    constructor(
        private readonly service: AuthService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('mock.create.users')
    async handleMockCreateEvent() {
        console.log('[EVENT] [mock.create.users] EventData:');
        try {
            // Create Demo User
            const demoUserJohn = await this.service.register({
                email: 'john@luminaa.chat',
                firstName: 'John',
                lastName: 'Doe',
                password: 'demo',
                roles: ['employee', 'admin'],
            });

            const demoUserTim = await this.service.register({
                email: 'tim@luminaa.chat',
                firstName: 'Tim',
                lastName: 'Schuster',
                password: 'demo',
                roles: ['client'],
            });

            const demoUserJenny = await this.service.register({
                email: 'jenny@luminaa.chat',
                firstName: 'Jenny',
                lastName: 'Hauser',
                password: 'demo',
                roles: ['client'],
            });

            const demoUserKatarina = await this.service.register({
                email: 'katarina@luminaa.chat',
                firstName: 'Katarina',
                lastName: 'Schmidt',
                password: 'demo',
                roles: ['client'],
            });

            const demoUserUte = await this.service.register({
                email: 'ute@luminaa.chat',
                firstName: 'Ute',
                lastName: 'Becker',
                password: 'demo',
                roles: ['employee'],
            });

            const demoUserFrank = await this.service.register({
                email: 'frank@luminaa.chat',
                firstName: 'Frank',
                lastName: 'Henrichs',
                password: 'demo',
                roles: ['employee'],
            });

            const demoUserMartin = await this.service.register({
                email: 'martin@luminaa.chat',
                firstName: 'Martin',
                lastName: 'Besold',
                password: 'demo',
                roles: ['employee'],
            });

            const demoUserOlaf = await this.service.register({
                email: 'olaf@luminaa.chat',
                firstName: 'Olaf',
                lastName: 'Graf',
                password: 'demo',
                roles: ['employee'],
            });

            const demoUserAnne = await this.service.register({
                email: 'anne@luminaa.chat',
                firstName: 'Anne',
                lastName: 'Schnell',
                password: 'demo',
                roles: ['client'],
            });

            const demoUserBeate = await this.service.register({
                email: 'beate@luminaa.chat',
                firstName: 'Beate',
                lastName: 'Cloppenburg',
                password: 'demo',
                roles: ['employee', 'teamlead'],
            });

            const demoUserHolger = await this.service.register({
                email: 'holger@luminaa.chat',
                firstName: 'Holger',
                lastName: 'Paper',
                password: 'demo',
                roles: ['employee', 'teamlead'],
            });

            this.eventEmitter.emit('mock.create.tenants', {
                users: {
                    demoUserJohn: demoUserJohn,
                    demoUserTim: demoUserTim,
                    demoUserJenny: demoUserJenny,
                    demoUserKatarina: demoUserKatarina,
                    demoUserUte: demoUserUte,
                    demoUserFrank: demoUserFrank,
                    demoUserBeate: demoUserBeate,
                    demoUserHolger: demoUserHolger,
                    demoUserMartin: demoUserMartin,
                    demoUserAnne: demoUserAnne,
                    demoUserOlaf: demoUserOlaf,
                },
            });
        } catch (e) {
            console.error('[EVENT] [mock.create.users] Fehler:');
            console.error(e);
        }
    }
}
