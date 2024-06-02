import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './schemas/group.schema';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {User} from "../user/schemas/user.schema";

@Injectable()
export class GroupsService {
    constructor(
        private eventEmitter: EventEmitter2,
        @InjectModel(Group.name) private readonly model: Model<Group>,
    ) {}

    async create(
        divisionId: string,
        createDto: CreateGroupDto,
    ): Promise<Group> {
        try {
            console.log('create Group');
            console.log('[GroupsService] Division ID: ', divisionId);
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Group | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(currentUser?: User, divisionId?: string): Promise<Group[] | null> {
        try {
            let filter = {};
            if (currentUser)
                filter = { members: currentUser._id, ...filter };
            if (divisionId)
                filter = { division: divisionId, ...filter };

            return this.model.find(filter)
                .populate('owners')
                .populate('members')
                .populate('division')
                .populate('channels')
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateGroupDto): Promise<Group> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
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
