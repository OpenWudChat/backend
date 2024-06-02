import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantsSchema } from './schemas/tenants.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import { MockDeleteListener } from './listeners/mock-delete.listener';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Tenant.name, schema: TenantsSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [TenantsController],
    providers: [TenantsService, MockCreateListener, MockDeleteListener],
})
export class TenantsModule {}
