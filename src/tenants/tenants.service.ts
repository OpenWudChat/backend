import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from './schemas/tenants.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {User} from "../user/schemas/user.schema";

@Injectable()
export class TenantsService {
    constructor(
        private eventEmitter: EventEmitter2,
        @InjectModel(Tenant.name) private readonly model: Model<Tenant>,
    ) {}

    async create(createDto: CreateTenantDto, currentUser: User): Promise<Tenant> {
        try {
            if (currentUser) {
                createDto.owners = [];
                createDto.owners.push(currentUser)
                createDto.members = [];
                createDto.members.push(currentUser)
            }
            const tenant = await this.model.create(createDto);
            this.eventEmitter.emit('tenant.created', tenant);

            return tenant;
        } catch (error) {
            throw new HttpException(`Conflict!: ${error}`, HttpStatus.CONFLICT);
        }
    }

    async createComputed(createDto: CreateTenantDto): Promise<Tenant> {
        try {
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Tenant | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(currentUser: User): Promise<Tenant[] | null> {
        try {
            let filter = {};
            if (currentUser)
                filter = { members: currentUser._id, ...filter };

            return this.model
                .find(filter)
                .populate('owners')
                .populate('members')
                .populate('groups');
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateTenantDto): Promise<Tenant> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteAll(): Promise<void> {
        try {
            const entities = await this.model.find().exec();

            for (const entity of entities) {
                await this.model.deleteOne({ _id: entity._id });
            }
        } catch (error) {
            throw new HttpException('Error', HttpStatus.NOT_FOUND);
        }
    }
}
