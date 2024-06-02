import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from './schemas/channel.schema';
import {User} from "../user/schemas/user.schema";

@Injectable()
export class ChannelsService {
    constructor(
        @InjectModel(Channel.name) private readonly model: Model<Channel>,
    ) {}

    async create(
        createDto: CreateChannelDto,
    ): Promise<Channel> {
        try {
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Channel | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(
        currentUser?: User,
        groupId?: string,
    ): Promise<Channel[] | null> {
        try {
            let filter = {};
            if (currentUser)
                filter = { members: currentUser._id, ...filter };
            if (groupId)
                filter = { group: groupId, ...filter };

            return this.model
                .find(filter)
                .populate('owners')
                .populate('members')
                .populate('messages');
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateChannelDto): Promise<Channel> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
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
