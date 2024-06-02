import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Division, DivisionSchema } from '../divisions/schemas/division.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import { MockDeleteListener } from './listeners/mock-delete.listener';
import {CreateDivisionListener} from "./listeners/create-division.listener";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Group.name, schema: GroupSchema },
            { name: Division.name, schema: DivisionSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [GroupsController],
    providers: [GroupsService, MockCreateListener, MockDeleteListener, CreateDivisionListener],
})
export class GroupsModule {}
