import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';

@Injectable()
export class DivisionCreatedListener {
    constructor(
        private readonly service: GroupsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('division.created')
    async handleMockCreateEvent(event: any) {
        console.log('[EVENT] [Groups] [Listeners] [division.created] EventData');

        try {
            const newGroup = await this.service.create(event._id, {
                name: 'Intern',
                description: 'Austausch Gruppe für die Mitarbeiter',
                color: '#000000',
                icon: 'shield',
                division: event,
                channels: [],
                members: event.members,
                owners: event.owners,
                minRole: event.minRole || 'client',
                visible: true,
            });
            this.eventEmitter.emit('group.created', {
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
