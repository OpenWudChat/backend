import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { SocketMessage } from './models/socketMessage';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Message } from '../messages/schemas/message.schema';
import { Channel } from '../channels/schemas/channel.schema';

@WebSocketGateway({
    cors: {
        origin: ['*', 'localhost', 'https://admin.socket.io'],
        transports: ['websocket'],
        credentials: true,
    },
})
export class SocketsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`------------------------`);
        console.log(`[SOCKET] Client connected: ${client.id}`);
        //console.log(client);
        console.log(`[SOCKET] Token: ${client.handshake?.auth?.token}`);
        console.log(`[SOCKET] User ID: ${client.handshake?.auth?.userID}`);
        console.log(
            `[SOCKET] User Name: ${JSON.stringify(
                client.handshake?.auth?.userName,
            )}`,
        );
    }

    handleDisconnect(client: Socket, ...args: any[]) {
        console.log(`[SOCKET] Client disconnected: ${client.id}: ${args}`);
        console.log(`------------------------`);
        this.server.emit('user:status', {
            userId: client.handshake?.auth?.userID,
            event: 'left',
        });
    }

    async afterInit() {
        instrument(this.server, {
            auth: false,
            mode: 'development',
        });
    }

    @SubscribeMessage('channel:enter') // <3>
    async enterChannel(client: Socket, channel: string) {
        client.join(channel);
        client.broadcast.to(channel).emit('user:status', {
            userId: client.handshake?.auth?.userID,
            event: 'joined',
        }); // <2>
    }

    @SubscribeMessage('channel:leave') // <3>
    async leaveChannel(client: Socket, roomId: string) {
        client.broadcast.to(roomId).emit('user:status', {
            userId: client.handshake?.auth?.userID,
            event: 'left',
        }); // <3>
        client.leave(roomId);
    }

    @SubscribeMessage('message:add') // <4>
    async addMessage(client: Socket, channel: Channel, message: Message) {
        // message.owner = client.user._id;
        // message.created = new Date();
        // message = await this.messagesModel.create(message);
        // message.owner = {_id: client.user._id, nickname: client.user.nickname} as User;
        this.server.in(channel._id as string).emit('message', message);
    }

    @SubscribeMessage('chat_message')
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
    handleMessagesNew(
        @MessageBody() data: SocketMessage,
        @ConnectedSocket() socket: Socket,
    ): WsResponse<unknown> {
        //console.log(data);
        const event = 'chat_message';
        socket.broadcast.emit(event, data);
        return { event, data };
    }
}

// 6558fac3bb529d4a188f99a1 J. Doe
// 6558fb27bb529d4a188f99a3 Em. Ployee
