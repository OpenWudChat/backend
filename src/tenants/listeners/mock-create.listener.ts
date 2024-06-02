import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TenantsService } from '../tenants.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import {User} from "../../user/schemas/user.schema";

@Injectable()
export class MockCreateListener {
    constructor(
        private readonly service: TenantsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('mock.create.tenants')
    async handleMockCreateEvent(event: { users: any }) {
        console.log('[EVENT] [MOCK] [Tenants] [Listeners] [mock.create.tenants] EventData');
        try {
            // Ambulant
            const tenantAmbulant = await this.service.create({
                name: 'Ambulant',
                description: 'Demo Bereich: Ambulant',
                color: '#000000',
                icon: 'truck',
                owners: [
                    event.users.demoUserJohn, // employee,admin
                ],
                members: [
                    event.users.demoUserJohn, // employee,admin
                    event.users.demoUserHolger, // employee,teamlead
                    event.users.demoUserFrank, // employee
                    event.users.demoUserMartin,// employee
                    event.users.demoUserAnne, // client
                    event.users.demoUserKatarina, // client
                ],
                minRole: 'client',
                visible: true,
            } as CreateTenantDto, null as User);

            this.eventEmitter.emit('mock.create.groups', {
                users: event.users,
                groups: [
                    {
                        name: 'Intern',
                        description: 'Austausch für die Mitarbeiter im Ambulanten Bereich',
                        icon: 'shield',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                            {
                                name: 'Diensttausch',
                                description: 'Chat für Diensttausch',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                            {
                                name: 'Besonderheiten',
                                description: 'Chat für Besonderheiten',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserHolger, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                            event.users.demoUserUte, // employee
                            event.users.demoUserOlaf, // employee
                        ],
                        minRole: 'employee',
                    },
                    {
                        name: 'Anne',
                        description: 'Fall Anne',
                        icon: 'briefcase',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                    event.users.demoUserFrank, // employee
                                    event.users.demoUserMartin,// employee
                                    event.users.demoUserAnne, // client
                                ],
                            },
                            {
                                name: 'Intern: Anne',
                                description: 'MA Intern Chat für Anne',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                    event.users.demoUserFrank, // employee
                                    event.users.demoUserMartin,// employee
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserHolger, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserHolger, // employee,teamlead
                            event.users.demoUserFrank, // employee
                            event.users.demoUserMartin,// employee
                            event.users.demoUserAnne, // client
                        ],
                        minRole: 'client',
                    },
                    {
                        name: 'Katarina',
                        description: 'Fall Katarina',
                        icon: 'briefcase',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                    event.users.demoUserMartin,// employee
                                    event.users.demoUserKatarina, // client
                                ],
                            },
                            {
                                name: 'Intern: Katarina',
                                description: 'MA Intern Chat für Katarina',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserHolger, // employee,teamlead
                                    event.users.demoUserMartin,// employee
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserHolger, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserHolger, // employee,teamlead
                            event.users.demoUserFrank, // employee
                            event.users.demoUserMartin,// employee
                            event.users.demoUserKatarina, // client
                        ],
                        minRole: 'client',
                    },
                ],
                tenant: tenantAmbulant,
            });


            // Stationär
            const tenantStationaer = await this.service.create({
                name: 'Stationär',
                description: 'Demo Bereich: Stationär',
                color: '#000000',
                icon: 'house',
                owners: [
                    event.users.demoUserJohn, // employee,admin
                ],
                members: [
                    event.users.demoUserJohn, // employee,admin
                    event.users.demoUserBeate, // employee,teamlead
                    event.users.demoUserUte, // employee
                    event.users.demoUserOlaf, // employee
                    event.users.demoUserTim, // client
                    event.users.demoUserJenny, // client
                ],
                minRole: 'client',
                visible: true,
            } as CreateTenantDto, event.users.demoUserJohn._id);

            this.eventEmitter.emit('mock.create.groups', {
                users: event.users,
                groups: [
                    {
                        name: 'Intern',
                        description: 'Austausch für die Mitarbeiter im Stationären Bereich',
                        color: '#000000',
                        icon: 'shield',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                            {
                                name: 'Diensttausch',
                                description: 'Chat für Diensttausch',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                            {
                                name: 'Besonderheiten',
                                description: 'Chat für Besonderheiten',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                            event.users.demoUserUte, // employee
                            event.users.demoUserOlaf, // employee
                        ],
                        minRole: 'employee',
                    },
                    {
                        name: 'WHG1',
                        description: 'Wohngruppe 1',
                        color: '#000000',
                        icon: 'house',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                    event.users.demoUserTim, // client
                                    event.users.demoUserJenny, // client
                                ],
                            },
                            {
                                name: 'Jenny',
                                description: 'Jennys Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserOlaf, // employee
                                    event.users.demoUserJenny, // client
                                ],
                            },
                            {
                                name: 'Tim',
                                description: 'Tims Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserTim, // client
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                            event.users.demoUserUte, // employee
                            event.users.demoUserTim, // client
                        ],
                        minRole: 'client',
                    },
                    {
                        name: 'WHG2',
                        description: 'Wohngruppe 2',
                        color: '#000000',
                        icon: 'house',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                    event.users.demoUserUte, // employee
                                    event.users.demoUserOlaf, // employee
                                    event.users.demoUserJenny, // client
                                ],
                            },
                            {
                                name: 'Jenny',
                                description: 'Jennys Chat',
                                owners: [
                                    event.users.demoUserJohn, // employee,admin
                                    event.users.demoUserBeate, // employee,teamlead
                                ],
                                members: [
                                    event.users.demoUserOlaf, // employee
                                    event.users.demoUserJenny, // client
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                        ],
                        members: [
                            event.users.demoUserJohn, // employee,admin
                            event.users.demoUserBeate, // employee,teamlead
                            event.users.demoUserUte, // employee
                            event.users.demoUserJenny, // client
                        ],
                        minRole: 'client',
                    },
                ],
                tenant: tenantStationaer,
            });
        } catch (e) {
            console.error('[EVENT] [mock.create.tenants] Fehler:');
            console.error(e);
        }
    }
}
