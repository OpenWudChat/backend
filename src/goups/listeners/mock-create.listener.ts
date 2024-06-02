import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class MockCreateListener {
    constructor(
        private readonly service: GroupsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('mock.create.groups')
    async handleMockCreateEvent(event: {
        users: any;
        groups: any;
        tenant: any;
    }) {
        console.log('[EVENT] [MOCK] [Groups] [Listeners] [mock.create.groups] EventData');

        try {
            for (const group of event.groups) {
                const newGroup = await this.service.create(event.tenant._id, {
                    name: group.name,
                    description: group.description,
                    color: group.color || '#000000',
                    icon: group.icon || 'fa fa-hashtag',
                    tenant: event.tenant._id,
                    channels: [],
                    members: group.members,
                    owners: group.owners,
                    minRole: group.minRole || 'client',
                    visible: true,
                } as CreateGroupDto);

                this.eventEmitter.emit('mock.create.channels', {
                    users: event.users,
                    tenant: event.tenant,
                    group: newGroup,
                    channels: group.channels,
                });
            }
        } catch (e) {
            console.error('[EVENT] [mock.create.groups] Fehler:');
            console.error(e);
        }
    }
}
