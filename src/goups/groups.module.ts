import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Tenant, TenantsSchema } from '../tenants/schemas/tenants.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import { MockDeleteListener } from './listeners/mock-delete.listener';
import {TenantCreatedListener} from "./listeners/tenant-created.listener";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Group.name, schema: GroupSchema },
            { name: Tenant.name, schema: TenantsSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [GroupsController],
    providers: [GroupsService, MockCreateListener, MockDeleteListener, TenantCreatedListener],
})
export class GroupsModule {}
