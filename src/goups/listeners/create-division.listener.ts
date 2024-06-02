import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';

@Injectable()
export class CreateDivisionListener {
    constructor(
        private readonly service: GroupsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('division.created')
    async handleMockCreateEvent(event: any) {
        console.log('[EVENT] [groups] [division.created] EventData:', event);

        try {
            const newGroup = await this.service.create(event._id, {
                name: 'Intern',
                description: 'Austausch für die Mitarbeiter',
                color: '#000000',
                icon: 'shield',
                division: event._id,
                channels: [],
                members: event.members,
                owners: event.owners,
                minRole: event.minRole || 'client',
                visible: true,
            });
            this.eventEmitter.emit('mock.create.channels', {
                users: event.users,
                division: event.division,
                group: newGroup,
                channels: newGroup.channels,
            });
        } catch (e) {
            console.error('[EVENT] [groups] [division.created] Fehler:');
            console.error(e);
        }
    }
}
