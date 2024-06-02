import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { SocketsModule } from './sockets/sockets.module';
import { GroupsModule } from './goups/groups.module';
import { RolesModule } from './roles/roles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TenantsModule } from './tenants/tenants.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            // set this to `true` to use wildcards
            wildcard: false,
            // the delimiter used to segment namespaces
            delimiter: '.',
            // set this to `true` if you want to emit the newListener event
            newListener: false,
            // set this to `true` if you want to emit the removeListener event
            removeListener: false,
            // the maximum amount of listeners that can be assigned to an event
            maxListeners: 10,
            // show event name in memory leak message when more than maximum amount of listeners is assigned
            verboseMemoryLeak: false,
            // disable throwing uncaughtException if an error event is emitted and it has no listeners
            ignoreErrors: false,
        }),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}`,
            {
                dbName: process.env.MONGO_DB_DATABASE,
                auth: {
                    username: process.env.MONGO_DB_ROOT_USER,
                    password: process.env.MONGO_DB_ROOT_PASSWORD,
                },
                autoCreate: true,
            },
        ),
        UserModule,
        AuthModule,
        MessagesModule,
        SocketsModule,
        GroupsModule,
        RolesModule,
        TenantsModule,
        ChannelsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
