import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupCreatedEvent } from '../../goups/events/group-created.event';

@Injectable()
export class GroupsListener {
    constructor() {}

    @OnEvent('group.created')
    async handleGroupCreatedEvent(event: GroupCreatedEvent) {
        try {
            console.log(
                '[EVENTS] [Sockets] [GroupsListener] [group.created] EventData: ',
                // event,
            );
        } catch (e) {
            console.error(e);
        }
    }
}
