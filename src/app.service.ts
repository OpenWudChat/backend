import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
    constructor(private eventEmitter: EventEmitter2) {}

    getHello(): string {
        return 'Hello World!';
    }

    async addMockData(): Promise<any> {
        // Create Mock Data
        this.eventEmitter.emit('mock.create.roles');
        this.eventEmitter.emit('mock.create.users');

        return {
            message: 'Mock data added!',
        };
    }

    async deleteMockData(): Promise<any> {
        this.eventEmitter.emit('mock.delete');
        return {
            message: 'Mock data deleted!',
        };
    }

    async install(): Promise<any> {
        this.eventEmitter.emit('luminaa.install');
        return {
            message: 'Successful installed!',
        };
    }
}
