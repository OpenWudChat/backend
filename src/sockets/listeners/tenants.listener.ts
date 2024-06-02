import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TenantListener {
    @OnEvent('tenant.created')
    async handleTenantCreatedEvent(event: any) {
        try {
            console.log(
                '[EVENTS] [Sockets] [TenantsListener] [tenant.created] EventData: ',
                // event,
            );
        } catch (e) {
            console.error(e);
        }
    }
}
