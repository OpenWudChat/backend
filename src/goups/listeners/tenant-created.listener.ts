import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';

@Injectable()
export class TenantCreatedListener {
    constructor(
        private readonly service: GroupsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('tenant.created')
    async handleMockCreateEvent(event: any) {
        try {
            console.log('[EVENT] [Groups] [Listeners] [tenant.created] EventData',
                event
            );
            const newGroup = await this.service.create(event._id, {
                name: 'Intern',
                description: 'Austausch Gruppe für die Mitarbeiter',
                color: '#000000',
                icon: 'shield',
                tenant: event,
                channels: [],
                members: event.members,
                owners: event.owners,
                minRole: event.minRole || 'client',
                visible: true,
            });
            this.eventEmitter.emit('group.created', {
                minRole: event.minRole,
                members: event.members,
                owners: event.owners,
                tenant: event.tenant,
                group: newGroup,
            });
        } catch (e) {
            console.error('[EVENT] [groups] [tenant.created] Fehler:');
            console.error(e);
        }
    }
}
