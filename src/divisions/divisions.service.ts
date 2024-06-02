import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Division } from './schemas/division.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {User} from "../user/schemas/user.schema";

@Injectable()
export class DivisionsService {
    constructor(
        private eventEmitter: EventEmitter2,
        @InjectModel(Division.name) private readonly model: Model<Division>,
    ) {}

    async create(createDto: CreateDivisionDto, currentUser: User): Promise<Division> {
        try {
            if (currentUser) {
                createDto.owners = [];
                createDto.owners.push(currentUser)
                createDto.members = [];
                createDto.members.push(currentUser)
            }
            const division = await this.model.create(createDto);
            this.eventEmitter.emit('division.created', division);

            return division;
        } catch (error) {
            throw new HttpException(`Conflict!: ${error}`, HttpStatus.CONFLICT);
        }
    }

    async createComputed(createDto: CreateDivisionDto): Promise<Division> {
        try {
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Division | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(currentUser: User): Promise<Division[] | null> {
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

    async update(id: string, updateDto: UpdateDivisionDto): Promise<Division> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
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
