import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { MockDeleteListener } from './listeners/mock-delete.listener';
import { MockCreateListener } from './listeners/mock-create.listener';
import {InstallLuminaaListener} from "./listeners/install.listener";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ],
    controllers: [RolesController],
    providers: [RolesService, MockCreateListener, MockDeleteListener, InstallLuminaaListener],
})
export class RolesModule {}
