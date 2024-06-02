import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DivisionsListener {
    @OnEvent('division.created')
    async handleDivisionCreatedEvent(event: any) {
        try {
            console.log(
                '[EVENTS] [Sockets] [DivisionsListener] [division.created] EventData: ',
                // event,
            );
        } catch (e) {
            console.error(e);
        }
    }
}
